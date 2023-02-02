import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import css from './App.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button/Button';

import axios from 'axios';

import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31396399-0c0a53b00e87586b8fc1cddd2';

export const App = () => {
  const [gallary, setGallary] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [totalFind, setTotalFind] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const firsRender = useRef(true);

  const hendelSerchSubmit = value => {
    setSearch(value);
    setPage(1);
    setGallary([]);
    setTotalFind(0);

    console.log(search);
  };

  useEffect(() => {
    const handelFetch = async serchValue => {
      try {
        setIsLoaderVisible(true);
        const { data } = await axios.get(
          `${BASE_URL}?key=${API_KEY}&per_page=15&page=${page}&q=${serchValue}&image_type=photo&pretty=true`
        );
        console.log(data);
        setGallary(prevState => [...prevState, ...data.hits]);
        setTotalFind(prevState => prevState + data.hits.length);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaderVisible(false);
      }
    };
    if (!firsRender.current) {
      handelFetch(search);

      return;
    }
    firsRender.current = false;
  }, [search, page]);

  const handeLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmitHendler={hendelSerchSubmit} />
      <ImageGallery images={gallary} />
      {gallary.length > 0 && totalFind !== totalHits && (
        <>
          {!isLoaderVisible && <Button onClick={() => handeLoadMore()} />}
          <div className={css.loader}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              margin="10"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={isLoaderVisible}
            />
          </div>
        </>
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     gallary: [],
//     search: '',
//     page: 1,
//     isLoaderVisible: false,
//     totalFind: 0,
//     totalHits: 0,
//   };

//   componentDidUpdate(_, prevState) {
//     const { search, page } = this.state;
//     if (search !== prevState.search || page !== prevState.page) {
//       console.log('State Change');
//       this.handelFetch(search);
//     }
//   }
//   hendelSerchSubmit = value => {
//     this.setState({ search: value, page: 1, gallary: [], totalFind: 0 });
//     console.log(this.state.search);
//   };

//   handelFetch = async serchValue => {
//     const { page } = this.state;
//     try {
//       this.setState({ isLoaderVisible: true });
//       const { data } = await axios.get(
//         `${BASE_URL}?key=${API_KEY}&per_page=15&page=${page}&q=${serchValue}&image_type=photo&pretty=true`
//       );
//       console.log(data)
//       this.setState(prevState => ({
//         gallary: [...prevState.gallary, ...data.hits],
//         totalFind: prevState.totalFind + data.hits.length,
//         totalHits: data.totalHits,
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoaderVisible: false });
//     }
//   };

//   handeLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   render() {
//     const { gallary, isLoaderVisible, totalFind, totalHits } = this.state;
//     return (
//       <div className={css.App}>
//         <SearchBar onSubmitHendler={this.hendelSerchSubmit} />
//         <ImageGallery images={gallary} />
//         {gallary.length > 0 &&
//           (totalFind !== totalHits && (
//             <>
//               {!isLoaderVisible && (
//                 <Button onClick={() => this.handeLoadMore()} />
//               )}
//               <div className={css.loader}>
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="9"
//                   margin="10"
//                   color="#3f51b5"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{}}
//                   wrapperClassName=""
//                   visible={isLoaderVisible}
//                 />
//               </div>
//             </>
//           ))}
//       </div>
//     );
//   }
// }

App.propTypes = {
  search: PropTypes.string,
  gallary: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
