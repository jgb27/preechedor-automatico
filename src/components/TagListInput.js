import React, { useState } from 'react';

const TagListInput = ({ tagList, handleAddTag, handleRemoveTag }) => {

    const [tag, setTag] = useState('');
    const [text, setText] = useState('');

    return (
        <div style={style.container}>
            <span>
                Caso de duvidas acesse nosso tutorial: 
                <a href="https://www.google.com.br" target="_blank">Tutorial</a>
            </span>
            <div style={style.container_inputs}>
                <input
                    style={style.input}
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />

                <input
                    style={style.input}
                    type="text"
                    placeholder="Texto a ser usado"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    style={style.buttonAdd}
                    onClick={() => {

                        handleAddTag({ tag, text });
                        setTag('');
                        setText('');
                    }}>
                    Adicionar
                </button>
            </div>
            <div>
                <table style={style.table}>
                    <tr >
                        <th style={style.th}>Tag</th>
                        <th style={style.th}>Texto</th>
                        <th style={style.th}>Action</th>
                    </tr>
                    {tagList.map((tag, index) => (
                        tag.tag && tag.text ? (
                            <tr style={style.rowTable} key={index}>
                                <td style={style.td}>{tag.tag}</td>
                                <td style={style.td}>{tag.text}</td>
                                <td style={style.td}>
                                    <button
                                        style={style.buttonRemove}
                                        onClick={() => handleRemoveTag(tag)}>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ) : null
                    ))}
                </table>
            </div>
        </div>
    );
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
        padding: 10,
    },
    container_inputs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    container_listExistingTag: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    input: {
        padding: 5,
        fontSize: 16,
        width: 200,
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    th: {
        backgroundColor: '#f2f2f2',
        color: 'black',
    },
    td: {
        padding: 8,
        textAlign: 'center',
    },
    buttonRemove: {
        padding: 5,
        fontSize: 16,
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 5,

    },
    buttonAdd: {
        padding: 5,
        fontSize: 16,
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 5,
    },
};

export default TagListInput;