'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import { VscVscode } from "react-icons/vsc";
import Image from 'next/image';

interface Project {
    item: {
        name: string;
        description?: string;
        tech?: string[];
        code?: string;
        article?: string;
        visitUrl?: string;
        thumbnail?: any;
        icon?: any,
        organisation?: string;
        vsCode?: boolean;
    };
}

const ProjectCard = ({ item }: Project) => {
    let Icon = item.icon
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="clean-project-card"
        >
            <div className='proj-content-title'>
                {item?.thumbnail ? <Image
                    src={item?.thumbnail}
                    alt="Logo"
                />: <></>}
            <h3 className="project-title title-font-family"> 
            {item.name}</h3>
            </div>
            {item?.organisation}
            <p className="project-description">{item.description}</p>

            {item.tech && (
                <div className="tech-stack">
                    {item.tech.map((tech, idx) => (
                        <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                </div>
            )}

            <div className="project-links">
                {item.code && (
                    <a href={item.code} target="_blank" rel="noopener noreferrer">
                        <FaGithub size={14} /> Code
                    </a>
                )}
                {item.article && (
                    <a href={item.article} target="_blank" rel="noopener noreferrer">
                        <FaFileAlt size={14} /> Article
                    </a>
                )}
                {item.visitUrl && !item?.vsCode && (
                    <a href={item.visitUrl} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={14} /> Live
                    </a>
                )}
                {item?.vsCode && <a href={item.visitUrl} target="_blank" rel="noopener noreferrer">
                        <VscVscode size={14} /> Live
                    </a>}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
