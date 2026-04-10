const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, '../posts');
const outputFile = path.join(__dirname, '../posts.json');

const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

const posts = files.map(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    let date;
    try {
        // Get last commit date for the file
        const gitDate = execSync(`git log -1 --format=%ai -- "${filePath}"`).toString().trim();
        date = gitDate || new Date().toISOString();
    } catch (e) {
        // Fallback to current date if not committed
        date = new Date().toISOString();
    }

    return {
        id: file.replace('.md', ''),
        title: content.split('\n')[0].replace('# ', ''),
        content: content,
        date: date
    };
});

// Sort posts by date in reverse chronological order
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log('Generated posts.json');
