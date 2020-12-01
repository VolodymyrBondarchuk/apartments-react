import "./warning.css"

const Warning = ({message}) => {

    return (
        <div className='warning-message-div'>
            <span>{message}</span>
        </div>
    )
}

export default Warning;