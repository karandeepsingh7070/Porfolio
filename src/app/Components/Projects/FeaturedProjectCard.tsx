'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaBook, FaPen } from 'react-icons/fa';

interface Project {
    item: {
        name: string;
        description: string;
        tech?: string[];
        code?: string;
        article?: string;
        visitUrl?: string;
        image?: string;
        Docs?: string;
        Blog? : string;
        thumbnail?: any;
    };
}

const FeaturedProjectCard = ({ item }: Project) => {
    console.log(item)
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="featured-project-card"
        >
            {item?.thumbnail ? <div className="featured-img-wrapper">
                <Image 
                    src={item?.thumbnail} 
                    alt="Overwatch TS"
                    fill
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                />
            </div> : <></>}
            <div className="featured-content">
                <h2 className="featured-title title-font-family">{item.name}</h2>
                <p className="featured-description">
                   {item.description}
                </p>
                  {item.tech && (
                <div className="tech-stack">
                    {item.tech.map((tech, idx) => (
                        <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                </div>
            )}
                <div className="featured-links">
                   {item?.visitUrl ? <a href="https://overwatchts.in" target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={14} /> Live
                    </a> : <></>}
                    {item?.Docs ? <a href="https://docs.overwatchts.in" target="_blank" rel="noopener noreferrer">
                        <FaBook size={14} /> Docs
                    </a> : <></>}
                    {item?.code ? <a href="https://github.com/karanpratapsingh/overwatch-ts" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={14} /> GitHub
                    </a> : <></>}
                    {item?.Blog ?<a href="https://overwatchts.in/blog" target="_blank" rel="noopener noreferrer">
                        <FaPen size={14} /> Blog
                    </a> : <></>}
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedProjectCard;
