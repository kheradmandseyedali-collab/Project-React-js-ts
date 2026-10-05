import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/desing_system/button";
import { createPostApi } from "../../../services/posts-service";
import { useAuthStore } from "../../../stores/auth.store";
import type { CreatePostForm } from "../../../types/posts";

const CreatePost = () => {

    const { user } = useAuthStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm<CreatePostForm>({
        defaultValues: {
            title: '',
            body: '',
            userId: undefined
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            toast.success('Post has been created sduccessfuly.');
            queryClient.invalidateQueries({ queryKey: ['posts-list'] })
            navigate('/app/posts');
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onCreatePost = (formData: CreatePostForm) => {
        mutate({
            title: formData.title,
            body: formData.body,
            userId: user?.id
        })
    }

    return (

        <form className="bg-slate-800 p-8 rounded-lg mx-auto w-1/3 mt-4" onSubmit={handleSubmit(onCreatePost)}>
            <div className='mb-4'>
                <label className='flex justify-between items-center text-lg mb-1'>
                    Title
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </label>
                <input
                    type="text"
                    placeholder='Enter Post Title'
                    className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                    {...register('title', { required: 'Post title is required' })}
                />
            </div>

            <div className='mb-4'>
                <label className='flex justify-between items-center text-lg mb-1'>
                    Body
                    {errors.body && <span className="text-red-500">{errors.body.message}</span>}
                </label>
                <textarea
                    placeholder='Enter Post Body'
                    className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                    rows={5}
                    {...register('body', { required: 'Post body is required', minLength: {value: 10, message: 'At Least 10 Characters'} })}
                ></textarea>
            </div>

            <div className="flex gap-4">
                <Button type="submit" color="blue" size="lg" text="Create" isLoading={isPending} />
                <Link to="/app/posts">
                    <Button color="gray" size="lg" text="Cancel" isDisabled={isPending} />
                </Link>
            </div>


        </form>

    )
}

export default CreatePost ;