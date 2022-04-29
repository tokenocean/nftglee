import { getAppProps } from "$queries/helpers";
export async function get({ request: { headers }, locals: { q } }) {
  try {
    let { artworks: titles, users: addresses } = await q(getAppProps);
    return {
      body: {
        addresses,
        titles,
      },
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
