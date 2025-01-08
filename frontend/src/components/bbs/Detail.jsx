import React , { useEffect,useState } from 'react';

import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [topic , setTopic] = useState({});
    const [categories, setCategories] = useState({});
    const [replies , setReplies] = useState({});

    //const newReply = useRef({ topic : id });

    const [newReply, setNewReply] = useState({ topic : id });

    useEffect(() => {
        loadTopic();
        loadCategories();
        loadReplies();
    }, []);

    const getCsrfToken = async () => {
        try {
            const response = await axios.get("/api/csrf-token/");
            return response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    }

    // GET: トピックリストを取得
    const loadTopic = async () => {

        try {
            const response = await axios.get(`/api/topics/${id}/`);
            console.log(response.data);

            setTopic(response.data);
        } catch (error) {

            console.error(error);
            if (error.response) {
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }

    const loadCategories = async () => {
        try {
            const response = await axios.get("/api/categories/");

            // { 1: { オブジェクト,  }, 2: {...}, 3: {...} } この形式に変換する
            const processed = {};
            for (let category of response.data){
                processed[category.id] = category;
            }
            setCategories(processed);

        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }

    const loadReplies = async () => {
        try {

            // TODO:ここでTopicに紐づくリプライだけ表示する
            const response = await axios.get(`/api/replies/?id=${id}`);
            // 指定がない場合は何も返さない
            //const response = await axios.get(`/api/replies/`);

            const processed = {};
            for (let reply of response.data){
                processed[reply.id] = reply;
            }
            setReplies(processed);

        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }


    const handleNewReply = (e) => {

        setNewReply( (prevNewReply) => {
            const updatedNewReply = { ...prevNewReply };
            updatedNewReply[e.target.name] = e.target.value;

            return updatedNewReply;
        });

    }

    const submitReply = async () => {
        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);
            const response = await axios.post("/api/replies/", newReply,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);
            setNewReply({ topic : id });
            loadReplies();

        } catch (error) {

            console.error(error);
            if (error.response) {
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }

    return (
        <>
        { topic.id ?
            <>
                <div className="border my-2">
                    <div className="bg-secondary-subtle">
                        <div>投稿日時: { topic.created_at }</div>
                        <div>カテゴリ: { categories[topic.category] && categories[topic.category].name }</div>
                    </div>
                    <div className="fs-5 p-2">{ topic.comment }</div>

                    <div className="text-end py-2">
                        <Link className="mx-1 btn btn-outline-success" to={`/topic/edit/${topic.id}/`}>編集</Link>
                        <span className="mx-1 btn btn-outline-danger" onClick={ () => { deleteTopic(topic.id) } }>削除</span>
                    </div>
                </div>

                <hr />

                <h2>リプライ一覧</h2>

                <form>
                    <textarea className="form-control" rows="4" name="comment" placeholder="コメントを入力してください" onChange={ handleNewReply } value={ newReply.comment || "" }></textarea>
                    <input className="form-control" type="button" onClick={ submitReply } value="投稿"/>
                </form>

                { replies ? 
                    Object.entries(replies).map( ([id, reply]) => (
                        <div className="border my-2" key={id}>
                            <div className="bg-secondary-subtle">
                                <div>投稿日時: { reply.created_at }</div>
                            </div>
                            <div className="fs-5 p-2">
                                {reply.comment}
                            </div>
                        </div>
                    ))
                : <div>リプライはありません</div> }

            </>
            : <div>トピックがありません</div> }
        </>
    );
};

export default Detail;


