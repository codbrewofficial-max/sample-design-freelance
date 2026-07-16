import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownData<T = Record<string, any>> {
  data: T;
  content: string;
}

/**
 * Reads a markdown file from the /content folder and parses its frontmatter and body.
 * Works strictly in Server Components/server environments.
 * @param filename The name of the file (e.g., 'home-hero.md')
 */
export function getContent<T = Record<string, any>>(filename: string): MarkdownData<T> {
  try {
    const filePath = path.join(process.cwd(), 'content', filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Markdown file not found at: ${filePath}`);
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    
    return {
      data: parsed.data as T,
      content: parsed.content,
    };
  } catch (error) {
    console.error(`Error loading markdown content for ${filename}:`, error);
    // Return fallback content to prevent crashes
    return {
      data: {} as T,
      content: '',
    };
  }
}
