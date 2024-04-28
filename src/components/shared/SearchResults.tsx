import { Models } from 'appwrite';
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultsPorps = {
  isSearchFetching: boolean;
  searchPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsPorps) => {
  if (isSearchFetching) return <Loader />

  if(searchedPosts.documents.length > 0) {
      return (
      <GridPostList posts={searchedPosts.documents} />
    )
  }

  return(
    <p className="text-light-4 mt-10 text-center w-full">No resutls found</p>
  )
}

export default SearchResults