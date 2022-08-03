import BodyBuilder from 'bodybuilder'

export const searchUserBuilder = (query) => {
  query.keyword = getKeyRegexp(query.keyword);
  return BodyBuilder().query("match_phrase_prefix", "searchString", query.keyword)
  .size(query.limit).build()
}

function getKeyRegexp(keyword) {
  let split = keyword.split(" ");
  let key = "";
  for (let i = 0; i < split.length; i++) {
    if (split[i]) {
      key += i !== (split.length - 1) ? `.*${split[i]}*.|` : `.*${split[i]}*.`
    }
  }
  return key
}
