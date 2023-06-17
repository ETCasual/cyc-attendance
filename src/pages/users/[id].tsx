import { api } from "@/utils/api"

const UserPage = () => {
 const s = "test"
    const msg = api.user.getSecretMessage.useQuery()

    return <>{msg.data}</>
}

export default UserPage