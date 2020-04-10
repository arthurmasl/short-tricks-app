import React from 'react';
import './Main.style.scss';
import { Switch, Route } from 'react-router-dom';
import Categories from '../Categories/Categories';
import Creator from '../Creator/Creator';
import Category from '../Category/Category';

// {
//   const [scrollTop, setScrollTop] = useState(window.scrollY);

//
//   const scrollStyle = isItem ? { marginTop: `-${scrollTop}px` } : {};

//   const scrollHandler = () => {
//     if (window.scrollY <= 60) {
//       setScrollTop(window.scrollY);
//     }
//   };

//   useLayoutEffect(() => {
//     if (isItem) {
//       window.addEventListener('scroll', scrollHandler);

//       return () => window.removeEventListener('scroll', scrollHandler);
//     }
//   }, [isItem]);
// }

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Categories}></Route>
        <Route exact path="/create" />

        <Route path="/create/:id" component={Creator} />
        <Route path="/:category/:item" component={Category} />
        <Route path="/:category" component={Category} />
      </Switch>
    </main>
  );
};

export default Main;
