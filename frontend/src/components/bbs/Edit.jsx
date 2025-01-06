import React , { useEffect,useState } from 'react';

import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {

    const { id } = useParams();
    const [topic , setTopic] = useState({});
    const [categories, setCategories] = useState({});

    useEffect(() => {
        loadTopic();
        loadCategories();
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

    const loadTopic = async () => {
        try {
            const response = await axios.get(`/api/topics/${id}/`);
            console.log(response.data);

            // HACK: ここで入力必須ではないcreated_atを除外する(日付フォーマットが違うため400エラーになる。)
            // 密結合になるので、もっと良い方法を考えるべき
            const data = { ...response.data };
            delete data.created_at;

            setTopic(data);

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

    const handleTopic = (e) => {
        try {
            setTopic( (prevTopic) => {
                const updatedTopic  = { ...prevTopic };

                updatedTopic[e.target.name]   = e.target.value;
                return updatedTopic;
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    const submitEditTopic = async () => {

        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);

            const response = await axios.put(`/api/topics/${id}/`, topic,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);

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
            <h2>編集フォーム</h2>

            <form>
                <select className="form-select w-auto d-inline-block" name="category" onChange={ handleTopic } value={topic.category || "" }>
                    <option value="">カテゴリを選んでください</option>
                    { Object.entries(categories).map( ([id, category]) => (
                    <option key={id} value={category.id}>{ category.name }</option>
                    )) }
                </select>

                <textarea className="form-control" rows="4" name="comment" placeholder="コメントを入力してください" onChange={ handleTopic } value={topic.comment}></textarea>
                <input className="form-control" type="button" onClick={ submitEditTopic } value="編集"/>
            </form>

            </>
            : <div>トピックがありません</div> }
        </>
    );
};

export default Edit;



