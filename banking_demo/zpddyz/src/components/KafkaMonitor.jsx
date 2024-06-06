import React, { useState, useEffect, startTransition } from 'react';
import { Avatar, List,Form,Button,Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import httpErrHandle from '../util/httpErrHandle';

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}

const KafkaMonitor = () => {
  // function timeoutPromise(ms, promise) {
  //   return new Promise((resolve, reject) => {
  //     const timeoutId = setTimeout(() => {
  //       reject(new Error("promise timeout"))
  //     }, ms);
  //     promise.then(
  //       (res) => {
  //         clearTimeout(timeoutId);
  //         // resolve(res);
  //       },
  //       (err) => {
  //         clearTimeout(timeoutId);
  //         reject(err);
  //       }
  //     );
  //   })
  // }
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchKafkaMessage() {

      try {
        const response = await fetchWithTimeout('http://localhost:9200/kafka/consume/sub', {
          timeout: 10000
        });
        const data = await response.json();
        // startTransition(() => {
          setMessages(data);
          setLoading(false); 
        // })
      } catch (error) {
        // console.log(error);
        httpErrHandle(error.response);
        setLoading(false); 
      }
    }
    fetchKafkaMessage();

    // const fetchMessages = async () => {
    //   try {
    //     let response = await fetch('http://localhost:9200/kafka/consume/sub');
    //     if (response.ok) {
    //       let data = await response.json();
    //       startTransition(() => {
    //         setMessages(data);
    //         setLoading(false);
    //       });
    //     } else {
    //       console.error('Failed to fetch messages');
    //     }
    //   } catch (error) {
    //     httpErrHandle(error.response.status);
    //     // console.error('Error fetching messages:', error);
    //   }
    // };

    // fetchMessages();

    // const interval = setInterval(fetchMessages, 100000);  // Fetch every 10 seconds
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ?
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <h2>
                未読のメッセージ取得中...
            </h2>
            <Spin size='large' style={{marginLeft:'24rem'}}/>
            {/* <span className="visually-hidden">Loading...</span> */}
          </div>
        </div>
        :
        <>
            <h2>
                未読のメッセージは下記になります。
            </h2>
            <List
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item, index) => (
                <List.Item style={{color:'yellow'}}>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={`message-${index+1}`}
                    description={item}
                    />
                </List.Item>
                )}
            />            
            <Form>
            <Button style={{width:'12rem',marginTop:'2rem',marginBottom:'2rem',marginLeft:'18rem'}} type="primary" danger onClick={()=>navigate('/')}>
                OK
            </Button>
            </Form>
        </>
      }
    </>
  );
};

export default KafkaMonitor;