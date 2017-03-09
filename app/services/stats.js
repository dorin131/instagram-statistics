'use strict';

module.exports = function() {
  const vm = this;

  const sortTags = (allMedia) => {
    let tags = [];
    let tagsCount = {};
    let tagsSortable = [];
    allMedia.forEach((post) => tags = tags.concat(post.tags));
    tags.forEach((tag) => {
      tagsCount[tag] ? tagsCount[tag]++ : tagsCount[tag] = 1;
    });
    Object.keys(tagsCount).forEach((tag) => tagsSortable.push([tag, tagsCount[tag]]));
    tagsSortable.sort((a, b) => b[1] - a[1]);
    return tagsSortable;
  }

  const sortFilters = (allMedia) => {
    let filterCount = {};
    let filterSortable = [];
    allMedia.forEach((post) => {
      filterCount[post.filter] ? filterCount[post.filter]++ : filterCount[post.filter] = 1;
    });
    Object.keys(filterCount).forEach((filter) => {
      filterSortable.push([filter, filterCount[filter]]);
    });
    filterSortable.sort((a, b) => b[1] - a[1]);
    return filterSortable;
  }

  const getPostsWithMostLikes = (allMedia, count) => {
    allMedia.sort((a, b) => b.likes.count - a.likes.count);
    return allMedia.slice(0, count || allMedia.length);
  }

  vm.getTopUsedTags = (allMedia, count) => {
    const tags = sortTags(allMedia).slice(0, count || tags.length);
    return Promise.resolve(tags);
  }

  vm.getTopPopularTags = (allMedia, count) => {
    const mostLikedMedia = getPostsWithMostLikes(allMedia, 10);
    const tags = sortTags(mostLikedMedia).slice(0, count || tags.length);
    return Promise.resolve(tags);
  }

  vm.getTopUsedFilters = (allMedia, count) => {
    const topUsedFilters = sortFilters(allMedia).slice(0, count || tags.length);
    return Promise.resolve(topUsedFilters);
  }

  vm.getTopPopularFilters = (allMedia, count) => {
    const mostLikedMedia = getPostsWithMostLikes(allMedia, 10);
    const topPopularFilters = sortFilters(mostLikedMedia).slice(0, count || tags.length);
    return Promise.resolve(topPopularFilters);
  }
}
