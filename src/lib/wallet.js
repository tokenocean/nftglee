import { electrs } from "$lib/api";
import getAddress from "$lib/getAddress";
import {
  address as Address,
  ECPair,
  Psbt,
  payments,
  networks,
  Transaction,
} from "@asoltys/liquidjs-lib";
import { Buffer } from "buffer";
import reverse from "buffer-reverse";
import { password, user } from "$lib/store";
const btc = "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225";
const network = networks.regtest;

let $user, $password;
password.subscribe((v) => ($password = v));
user.subscribe((v) => ($user = v));

let getHex = async (txid) => {
  return electrs.url(`/tx/${txid}/hex`).get().text();
};

export const pay = async (to, amount, fee) => {
  amount = parseInt(amount);
  fee = parseInt(fee);

  let addr = getAddress($user.mnemonic, $password);
  let { address, output, redeem, privateKey } = addr;
  let utxos = await electrs.url(`/address/${address}/utxo`).get().json();

  let prevout = utxos.find(
    (utxo) => utxo.asset === btc && utxo.value > amount + fee
  );

  if (!prevout) throw new Error("Insufficient funds");
  let prevoutTx = Transaction.fromHex(await getHex(prevout.txid));

  let change = prevout.value - amount - fee;

  let swap = new Psbt()
    .addInput({
      hash: prevout.txid,
      index: prevout.vout,
      witnessUtxo: prevoutTx.outs[prevout.vout],
      redeemScript: redeem.output,
    })
    // asset
    .addOutput({
      asset: btc,
      nonce: Buffer.alloc(1),
      script: Address.toOutputScript(to, network),
      value: amount,
    })
    // fee
    .addOutput({
      asset: btc,
      nonce: Buffer.alloc(1, 0),
      script: Buffer.alloc(0),
      value: fee,
    })
    //change
    .addOutput({
      asset: btc,
      nonce: Buffer.alloc(1),
      script: output,
      value: change,
    });

  return swap;
};

export const sign = (psbt) => {
  let addr = getAddress($user.mnemonic, $password);
  let { privateKey } = addr;
  return psbt.signAllInputs(ECPair.fromPrivateKey(privateKey)).finalizeAllInputs();
};

export const broadcast = async (psbt) => {
  let tx = psbt.extractTransaction();
  let hex = tx.toHex();

  return electrs.url("/tx").body(hex).post().text();
};