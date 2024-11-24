CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_link TEXT,
    user_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password)
VALUES 
('Alice Johnson', 'alice@example.com', 'password123'),
('Bob Smith', 'bob@example.com', 'password456'),
('Charlie Brown', 'charlie@example.com', 'password789');

INSERT INTO blogs (name, image_link, user_id, category, content)
VALUES
('How to Learn JavaScript', 'https://example.com/js-tutorial.jpg', 1, 'Programming', 'This is a comprehensive guide to learning JavaScript.'),
('10 Best Recipes for Beginners', 'https://example.com/recipes.jpg', 2, 'Cooking', 'Explore these easy recipes perfect for beginners.'),
('Traveling on a Budget', 'https://example.com/travel.jpg', 3, 'Travel', 'Tips and tricks for traveling without breaking the bank.'),
('Mastering ReactJS', 'https://example.com/react.jpg', 1, 'Programming', 'A step-by-step guide to becoming a ReactJS pro.'),
('Healthy Lifestyle Tips', 'https://example.com/health.jpg', 2, 'Health', 'Discover simple ways to maintain a healthy lifestyle.');
