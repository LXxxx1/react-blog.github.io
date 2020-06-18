import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd'
import CommentForm from '../CommentForm';
import axios from 'axios'
import { serviceUrl } from '../../config/apiUrl'
import CommentItem from '../CommentItem'
import '../../static/style/comment/comment.css'

//  格式化评论和回复数据
const commentFormat = list => {
  let commentList = [], replyList = []
  list.forEach(v => {
    if (!!v.is_reply) {
      replyList.push(v)
    } else {
      commentList.push(v)
    }
  })
  commentList.forEach(v => {
    v.children = replyList.filter(reply => +reply.reply_id === v.id).sort((a, b) => a.add_time - b.add_time);
  })
  return commentList
}


const CommentList = ({ artId, listKey, upComment }) => {
  const [list, setList] = useState([])
  const [drawerOptions, setDrawerOptions] = useState({ visible: false, item: undefined });
  const handleReply = (comment) => {
    setDrawerOptions({
      visible: true,
      item: comment
    })
  }

  const cancelReply = () => {
    setDrawerOptions({
      visible: false,
      item: undefined
    })
  }

  const submitReply = (values) => {
    const option = {
      ...values,
      is_reply: 1,
      reply_id: drawerOptions.item.id,
    }
    upComment(option)
    cancelReply()
    return false
  }
  const fetchData = async () => {
    const result = await axios(serviceUrl.getCommentListById + artId);
    const list = result.data.data;
    if (!list || !list.length) {
      return
    }
    const commentList = commentFormat(list);
    setList(commentList)
  }

  useEffect(() => {
    fetchData()
  }, [artId, listKey])


  if (!list.length) {
    return null
  }
  return (
    <div>
      {list.map(item => (
        <CommentItem
          key={item.id}
          item={item}
          handleReply={() => handleReply(item)}
        >
          {!!item.children.length && item.children.map(reply => (
            <CommentItem key={reply.id} item={reply} />
          ))}
        </CommentItem>
      ))}

      <Drawer
        title="回复"
        placement="right"
        width='30%'
        destroyOnClose
        closable={false}
        maskClosable={false}
        onClose={cancelReply}
        visible={drawerOptions.visible}
      >
        <CommentForm
          isReply
          onOk={submitReply}
          onCancel={cancelReply}
        />
      </Drawer>

    </div>
  )
}

export default CommentList