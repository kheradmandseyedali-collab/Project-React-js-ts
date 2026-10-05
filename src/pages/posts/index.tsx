import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LucideEye, LucidePencil, LucideRefreshCcw, LucideTrash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/global/PageHeader";
import { getPostsApi, deletePostApi, type PostsResponse } from "../../services/posts-service";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Ds_Button from '../../components/desing_system/DsButton';
import { toast } from 'react-toastify';

const Posts = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [paginationModel , setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8
    });

    const queryKey = ['posts-list', paginationModel.page, paginationModel.pageSize];

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: () => getPostsApi({ page: paginationModel.page, pageSize: paginationModel.pageSize }),
        placeholderData: keepPreviousData
    });

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: (id: number | string) => deletePostApi(id),
        onSuccess: (_data, deletedId) => {
            toast.success("پست با موفقیت حذف شد");
            
            queryClient.setQueryData<PostsResponse>(queryKey, (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    total: oldData.total - 1,
                    posts: oldData.posts.filter((p) => p.id !== Number(deletedId))
                };
            });
        },
        onError: () => {
            toast.error("خطا در حذف پست");
        }
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Row', width: 70 },
        { field: 'title', headerName: 'Title', width: 260 },
        { field: 'userId', headerName: 'User', width: 70 },
        { field: 'body', headerName: 'Post Text', width: 420 },
        { field: 'views', headerName: 'Views', width: 90 },
        { 
            field: 'tags', 
            headerName: 'Tags', 
            width: 180,
            valueGetter: (value: string[]) => Array.isArray(value) ? value.join(', ') : (value ?? '')
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            sortable: false,
            renderCell: (params) => {
                const onClick = (action: 'show' | 'delete' | 'edit') => {
                    switch (action) {
                        case 'show':
                            navigate(`/app/posts/${params.id}`);
                            break;
                        case 'edit':
                            navigate(`/app/posts/edit/${params.id}`);
                            break;
                        case 'delete':
                            if (window.confirm(`آیا از حذف پست شماره ${params.id} اطمینان دارید؟`)) {
                                deletePost(params.id);
                            }
                            break;
                    }
                };

                return (
                    <div className='flex items-center h-full'>
                        <ButtonGroup variant="outlined" size='small'>
                            <Button 
                                color='error' 
                                disabled={isDeleting}
                                onClick={() => onClick('delete')}
                            >
                                <LucideTrash size={18} />
                            </Button>
                            <Button 
                                color='info' 
                                onClick={() => onClick('edit')}
                            >
                                <LucidePencil size={18} />
                            </Button>
                            <Button 
                                color='inherit' 
                                onClick={() => onClick('show')}
                            >
                                <LucideEye size={18} />
                            </Button>
                        </ButtonGroup>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <PageHeader text="Posts Page" />

                <div className="flex items-center gap-2">
                    <Ds_Button 
                        startIcon={<LucideRefreshCcw size={29.5} />} 
                        onClick={() => refetch()} 
                        loading={!isLoading && isFetching} 
                        tooltip="Refetch"
                    />
                    <Link to="create">
                        <Ds_Button color="primary" size="large">Create Post</Ds_Button>
                    </Link>
                </div>
            </div>

            <DataGrid
                rows={data?.posts || []}
                columns={columns}
                paginationMode='server'
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={data?.total ?? 0}
                pageSizeOptions={[5, 9, 20, 50, 100]}
                loading={isLoading || isFetching}
                autoHeight
            />
        </div>
    );
};

export default Posts;
