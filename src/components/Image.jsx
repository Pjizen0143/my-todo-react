import PropTypes from "prop-types"

export default function Image( {ImageURL} ) {
    return (
            <img src={ImageURL} alt="Description" width="100px" height="100px"/>
    )
}


Image.propTypes = {
    ImageURL: PropTypes.string.isRequired
}