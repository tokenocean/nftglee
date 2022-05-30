import { getUsers } from "$queries/users";
export async function get({ request: { headers }, locals: { q } }) {
  try {
    return {
      body: await q(getUsers),
      headers,
    };
  } catch (e) {
    console.log(e);
    return {
      body: {},
      status: 500,
    };
  }
}
