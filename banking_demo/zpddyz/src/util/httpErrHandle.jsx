import { notification } from "antd";
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export default function httpErrHandle(sts) {
    switch (sts) {
        case '401':
        case 401:
            openNotificationWithIcon('error','権限不足','この処理はログインする必要あります');
            break;
        case '403':
        case 403:
            openNotificationWithIcon('error','権限不足','この処理はログインする必要あります');
            break;
        case '404':
        case 404:
            openNotificationWithIcon('error','お求めるものは存在しておりません');
            break;
        default:
            openNotificationWithIcon('error','未知のエラー発生',`エラーコードは${sts}`);
    }

}