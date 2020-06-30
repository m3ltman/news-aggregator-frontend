/* eslint-disable no-restricted-syntax */
export default function getRidOfNull(array) {
  for (const article of array) {
    if (article.urlToImage === null) {
      article.urlToImage = 'https://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg';
    }
  }
}
