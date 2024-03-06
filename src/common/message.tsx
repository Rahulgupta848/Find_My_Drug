import { notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { hideMessage } from '../redux/slices/messageSlice/messageSlice';

const Message = () => {
     const [api, contextHolder] = notification.useNotification();
     const { msg, error, show } = useAppSelector((state) => state.message);
     const dispatch = useAppDispatch();

     const popMessage = () => {
          if (error) {
               api['error']({
                    message: `${msg}`,

               });
          } else {
               api['success']({
                    message: `${msg}`,
               });
          }
          dispatch(hideMessage());
     }

     useEffect(() => {
          if (show) {
               popMessage();
          }
     }, [show])
     return (
          <div>{contextHolder}</div>
     )
}

export default Message;