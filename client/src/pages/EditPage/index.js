import { Button } from "antd"
import { useParams, useNavigate } from "react-router-dom"
import EditForm from "../../components/EditForm"
import NavBar from "../../components/NavBar"
import { useAppContext } from "../../context/AppContext"

const EditPage = () => {
    const navigate = useNavigate()
    const param = useParams()
    const { authState: { listUser } } = useAppContext()
    const currentUser = listUser.filter((item) => item.id == param.id)
    return (
        <>
            <NavBar />
            <EditForm user={currentUser[0]} />
            <Button style={{
                position: "fixed",
                right: "100px",
                borderRadius: "30px",
                width: "100px",
                height: "50px",
                fontSize: "20px"
            }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </>
    )
}

export default EditPage
