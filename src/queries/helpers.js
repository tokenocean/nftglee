export const getAppProps = `
    query {
        users(order_by: { username: asc }) {
            id
            address
            multisig
            username
            avatar_url
        }

        artworks {
            id
            asset
            edition
            editions
            title
            owner_id
        }
    }
`;
