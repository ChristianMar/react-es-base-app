import { styled } from '@mui/system';

export const PostItem = styled('div')({
  position: 'relative',
  display: 'block',
  maxWidth: 800,
  margin: '25px auto',
  border: '1px solid lightgray',
  boxShadow: '5px 10px lightgray',
  height: 200,
  borderRadius: 20,
});

export const PostElement = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const PostImage = styled('div')({
  margin: 20,
  height: 160,
  borderRadius: 20,
});

export const PostImageContent = styled('img')({
  height: '100%',
  borderRadius: 25,
});

export const Post = styled('div')(
  {
    margin: 20,
  },
  (props) => ({
    left: !props.full ? 250 : 20,
    width: !props.full ? 'calc(100% - 290px)' : 'calc(100% - 60px)',
  })
);

export const PostTitle = styled('div')({
  fontSize: 16,
  fontWeight: 'bold',
  cursor: 'pointer',
});

export const PostContent = styled('div')({
  marginTop: 20,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

export const PostDescription = styled('div')({
  position: 'absolute',
  fontSize: 12,
  bottom: 20,
  display: 'inline-flex',
});

export const PostUsername = styled('div')({
  cursor: 'pointer',
  textDecoration: 'underline',
  marginLeft: 10,
});

export const LoadMore = styled('div')({
  marginTop: '25px',
  marginBottom: '25px',
  textAlign: 'center',
});

export const PostBig = styled('div')({
  position: 'relative',
  display: 'block',
  maxWidth: 800,
  margin: '25px auto',
  border: '1px solid lightgray',
  boxShadow: '5px 10px lightgray',
  minHeight: 400,
  borderRadius: 20,
});

export const PostBigImage = styled('div')({
  margin: 20,
  height: 400,
  borderRadius: 20,
  display: 'block',
  textAlign: 'center',
});

export const PostBigImageContent = styled('img')({
  height: '100%',
  borderRadius: 20,
});

export const PostBigTitle = styled('div')({
  fontSize: 16,
  fontWeight: 'bold',
  display: 'block',
  margin: 20,
});

export const PostBigContent = styled('div')({
  marginTop: 20,
  display: 'block',
  margin: '20px 20px 200px 20px',
});

export const PostBigDescription = styled('div')({
  position: 'absolute',
  fontSize: 12,
  bottom: 20,
  left: 20,
  display: 'inline-flex',
});

export const PostTitleUsername = styled('div')({
  fontSize: 16,
  display: 'block',
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 20,
});

export const BackButton = styled('div')({
  position: 'relative',
  margin: '10px 25px',
});

export const PostButton = styled('div')({
  position: 'absolute',
  top: 0,
  right: 10,
});
