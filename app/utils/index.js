export const extractDomain = (url) => {
  let domain;

  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }

  if ( domain.indexOf("www.") === 0 )  {
    domain = domain.substring(4);
  }

  return domain;
}
