import { Avatar,Divider } from 'antd'
import './index.css'
const Author =()=>{

    return (
        <div className="author-div comm-box">
            {/* <div><Avatar size={100} src='src="data:image/jpeg;base64,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" '></Avatar></div> */}
            <div><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>

            <div className="author-introduction">
                <Divider>社交账号</Divider>
                <Avatar icon='github' size={28} className="account" ></Avatar>
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
        
    )

}

export default Author