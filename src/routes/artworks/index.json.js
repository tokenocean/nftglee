import { countArtworks, getActive } from "$queries/artworks";
import { hbp } from "$lib/api";

export async function post({ request, locals }) {
  try {
    let body = await request.json();
    let { q } = locals;
    let {
      limit = 210,
      offset = 0,
      where = {},
      order_by = [{ created_at: "desc" }],
      distinct_on = [],
    } = body;

    if (!Array.isArray(order_by)) order_by = [order_by];

    where.asking_asset = { _is_null: false };

    let artworks;
    where.artwork = {};
    Object.keys(where).map((k) => {
      if (k === "artwork") return;
      where["artwork"][k] = where[k];
      delete where[k];
    });
    order_by = order_by.map((k) => ({ artwork: k }));

    let { activeartworks } = await q(getActive, {
      where,
      limit,
      offset,
      order_by,
    });

    artworks = activeartworks.map(({ artwork }) => artwork);

    return {
      body: {
        artworks,
        total: artworks.length,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      body: {},
      status: 500,
    };
  }
}
