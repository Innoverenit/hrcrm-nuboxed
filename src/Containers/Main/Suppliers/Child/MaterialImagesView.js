

import ImageGallery from 'react-image-gallery';
import '../../../../node_modules/react-image-gallery/styles/css/image-gallery.css';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

class MaterialImagesView extends React.Component {
    render() {

        return <ImageGallery 
        items={images}
        // items={this.props.images}
        
        width={"1.8rem"}
        height={"1.8rem"}
        ></ImageGallery>
    }
}

export default (MaterialImagesView);