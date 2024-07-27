// Desc: Componente que gerencia uma lista de tags com suas respectivas ações

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Importando o arquivo CSS

const TagListInput = ({ tagList, handleAddTag, handleRemoveTag }) => {
    const [tag, setTag] = useState('');
    const [text, setText] = useState('');

    return (
        <div className="container">
            <span>
                Caso de dúvidas, acesse nosso tutorial:
                <a href="https://www.google.com.br" target="_blank" rel="noopener noreferrer">Tutorial</a>
            </span>
            <div className="container-inputs">
                <input
                    className="input"
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />

                <input
                    className="input"
                    type="text"
                    placeholder="Texto a ser usado"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    className="button-add"
                    onClick={() => {
                        handleAddTag({ tag, text });
                        setTag('');
                        setText('');
                    }}
                >
                    Adicionar
                </button>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Tag</th>
                            <th className="th">Texto</th>
                            <th className="th">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tagList.map((tag, index) => (
                            tag.tag && tag.text ? (
                                <tr className="row-table" key={index}>
                                    <td className="td">{tag.tag}</td>
                                    <td className="td">{tag.text}</td>
                                    <td className="td">
                                        <button
                                            className="button-remove"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

TagListInput.propTypes = {
    tagList: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleAddTag: PropTypes.func.isRequired,
    handleRemoveTag: PropTypes.func.isRequired,
};

export default TagListInput;