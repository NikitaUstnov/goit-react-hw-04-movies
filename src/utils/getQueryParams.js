import queryString from 'query-string';

export default function getQueryString(qs) {
  return queryString.parse(qs);
}