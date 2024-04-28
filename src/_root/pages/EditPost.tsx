import { useParams } from 'react-router-dom';
import PostForms from "@/components/forms/PostForms"
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import Loader from '@/components/shared/Loader';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if(isPending) return <Loader />

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5x1 flex-start gap-3 justify-start w-full">
          <img
            src="/asset/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForms action="Update" post={post} />
      </div>
    </div>
  )
}

export default EditPost