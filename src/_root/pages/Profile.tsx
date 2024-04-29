import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          {/* <div className="flex flex-center">
            badge area
          </div> */}
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-30 lg:w-30 s-full mt-5"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
              <p className="small-regular md:body-medium text-center xl:text-left">joined date
              </p>
              <p className="small-regular md:body-medium text-center xl:text-left">location
              </p>
            </div>
           
            <p className="small-medium md:base-medium text-center xl:text-left mt-5 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>
          
          {/* <div>
            links
          </div> */}

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              {/* <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-10 bg-dark-3 px-2 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={16}
                  height={16}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit profile
                </p>
              </Link> */}
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex flex-center">
          <Link
            to={`/profile/${id}`}
            className={`mr-4 ${
              pathname === `/profile/${id}`
            }`}>
            Posts
          </Link>
          <Link
            to={`/profile/${id}`}
            className={`mr-4 ${
              pathname === `/profile/${id}`
            }`}>
            <StatBlock value={0} label="Followers" />
          </Link>
          <Link
            to={`/profile/${id}`}
            className={`mr-3 ${
              pathname === `/profile/${id}`
            }`}>
            <StatBlock value={0} label="Following" />
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`mr-3 ${
              pathname === `/profile/${id}/liked-posts`
            }`}>
            Likes
          </Link>
          <Link
            to={`/profile/${id}`}
            className={`mr-0 ${pathname === `/profile/${id}`
              }`}>
            Points
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
