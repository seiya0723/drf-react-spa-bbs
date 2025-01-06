import React, { useEffect,useState } from 'react';
import axios from "axios";

import { Link } from "react-router-dom";


const Index = () => {

    const [topics, setTopics] = useState({});
    const [categories, setCategories] = useState({});

    const [toggleForm, setToggleForm] = useState(false);

    // フォーム入力をする時はStateではなくuseRefを使う。
    // 投稿完了時、初期化できないのでStateにする。
    /*
    const newTopic = useRef({});
    const newCategory = useRef({});
    */

    const [newTopic, setNewTopic]       = useState({});
    const [newCategory, setNewCategory] = useState({});


    useEffect(() => {
        // TODO:ここでTopicをロードする。
        loadTopics();
        loadCategories();
    }, []);


    // 今回JWT認証はオミットしたため、CSRFトークンを取得する。
    const getCsrfToken = async () => {
        try {
            const response = await axios.get("/api/csrf-token/");
            return response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    }


    const loadTopics = async () => {
        try {
            const response = await axios.get("/api/topics/");

            // { 1: { オブジェクト,  }, 2: {...}, 3: {...} } この形式に変換する
            const processed = {}; 
            for (let topic of response.data){
                processed[topic.id] = topic;
            }
            setTopics(processed);

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


    const submitTopic = async () => {
        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);
            console.log(newTopic);
            const response = await axios.post("/api/topics/", newTopic,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);

            setNewTopic({});
            loadTopics();

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

    
    const deleteTopic = async (id) => {
        if( !confirm("本当に削除しますか？\n紐付いているリプライも削除されます。") ){
            return false;
        }

        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);
            const response = await axios.delete(`/api/topics/${id}/`,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);
            loadTopics();
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

    const submitCategory = async () => {
        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);
            const response = await axios.post("/api/categories/", newCategory,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);
            setNewCategory({});

            loadCategories();

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

    
    const deleteCategory = async (id) => {
        if( !confirm("本当に削除しますか？\n紐付いている投稿やリプライも削除されます。") ){
            return false;
        }

        try {
            const csrfToken = await getCsrfToken();
            console.log(csrfToken);
            const response = await axios.delete(`/api/categories/${id}/`,
                { headers: { 'X-CSRFToken': csrfToken } },
            );
            console.log(response);
            loadTopics();
            loadCategories();
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


    const handleNewTopic = (e) => {
        /*
        console.log(e.currentTarget);
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.value);

        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        */

        try {
            setNewTopic( (prevNewTopic) => {
                const updatedNewTopic = { ...prevNewTopic };
                updatedNewTopic[e.target.name] = e.target.value;
                return updatedNewTopic;
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleNewCategory = (e) => {
        try {
            setNewCategory( (prevNewCategory) => {
                const updatedNewCategory = { ...prevNewCategory };
                updatedNewCategory[e.target.name] = e.target.value;
                return updatedNewCategory;
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleToggleForm = () => {
        setToggleForm( (prevToggleForm) => !prevToggleForm );
    }


    
    return (
        <>


            { toggleForm ? (
                <>
                <h2>カテゴリ一覧</h2>

                <form>
                    <input className="form-control w-auto d-inline-block" type="text" placeholder="カテゴリ名" name="name" onChange={handleNewCategory} value={newCategory.name || "" } />
                    <input className="btn btn-outline-primary" type="button" onClick={submitCategory} value="作成" />
                </form>

                <ul>
                { Object.entries(categories).map( ([id, category]) => (
                    <li key={id}>{ category.name } <span className="mx-1 btn btn-outline-danger" onClick={ () => { deleteCategory(category.id) } }>削除</span>
                    </li>
                ))}
                </ul>

                <span className="btn btn-outline-danger" onClick={handleToggleForm}>戻る</span>
                </>

            ) : (

                <>
                <h2>新規作成</h2>
                <form>
                    <select className="form-select w-auto d-inline-block" name="category" onChange={ handleNewTopic } value={ newTopic.category || "" }>
                        <option value="">カテゴリを選んでください</option>
                        { Object.entries(categories).map( ([id, category]) => (
                        <option key={id} value={category.id}>{ category.name }</option>
                        )) }
                    </select>

                    <span className="fs-4 d-inline-block mx-2" onClick={handleToggleForm} >
                        <i className="fa-regular fa-square-plus"></i>
                    </span>

                    <textarea className="form-control" rows="4" name="comment" placeholder="コメントを入力してください" onChange={ handleNewTopic } value={ newTopic.comment || "" }></textarea>
                    <input className="form-control" type="button" onClick={ submitTopic } value="投稿"/>
                </form>
                </>
            )

            }

            <hr />

            { Object.entries(topics).map( ([id, topic]) => (
                <div className="border my-2" key={id}>
                    <div className="bg-secondary-subtle">

                <div>投稿日時: { topic.created_at }</div>
                {/* <div>投稿日時: { formatDate(topic.created_at) } </div>  */}
                        <div>カテゴリ: { categories[topic.category] && categories[topic.category].name }</div>
                    </div>
                    <div className="fs-5 p-2">{ topic.comment }</div>

                    <div className="text-end py-2">

                        <Link className="mx-1 btn btn-outline-primary" to={`/topic/${topic.id}/`} >詳細</Link>
                        <Link className="mx-1 btn btn-outline-success" to={`/topic/edit/${topic.id}/`}>編集</Link>
                        <span className="mx-1 btn btn-outline-danger" onClick={ () => { deleteTopic(topic.id) } }>削除</span>
                    </div>

                </div>
            )) }
        </>
    );  
};

export default Index;


