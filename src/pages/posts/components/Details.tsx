import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../../constants";
import PageHeader from "../../../components/global/PageHeader";
import DsTypography from "../../../components/desing_system/DsTypography";
import Loading from "../../../components/global/Loading";


const PostDetails = () => {

    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const params = useParams();
    // console.log(params)
    const { postId } = useParams();

    const getPostDetails = () => {
        fetch(`${BASE_URL}/posts/${postId}`)
            .then(response => response.json())
            .then(data => setDetails(data))
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false))
    }


    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <>
            <PageHeader text={`Post Details - Post ID=${postId}`} element="h2" showBack backRoute="/posts" />

            {
                isLoading ?
                    <Loading />
                    :
                    <div className="bg-gray-700 p-4 rounded-lg w-1/2">
                        <DsTypography element="h1" className="text-2xl font-bold mb-4">{details.title}</DsTypography>
                        <DsTypography element="p" className="text-xl">{details.body}</DsTypography>
                    </div>
            }
        </>
    )
}

export default PostDetails