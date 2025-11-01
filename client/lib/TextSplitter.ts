type SplitTypeTypes = 'words' | 'chars';

interface Options {
  resizeCallback?: (element: HTMLElement) => void;
  splitTypeTypes?: SplitTypeTypes;
}

export default class TextSplitter {
  private element: HTMLElement;
  private options: Required<Options>;
  private observer?: ResizeObserver;
  private words: HTMLElement[] = [];
  private chars: HTMLElement[] = [];

  constructor(element: HTMLElement, options: Options = {}) {
    this.element = element;
    this.options = {
      resizeCallback: options.resizeCallback || (() => {}),
      splitTypeTypes: options.splitTypeTypes || 'words',
    };
    this.split();
    this.setupResizeObserver();
  }

  private split() {
    const text = this.element.textContent || '';
    this.element.innerHTML = '';

    if (this.options.splitTypeTypes === 'words') {
      const wordArray = text.split(/(\s+)/);
      wordArray.forEach((word) => {
        if (word.trim()) {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.textContent = word;
          span.style.whiteSpace = 'pre-wrap';
          this.element.appendChild(span);
          this.words.push(span);
        } else {
          this.element.appendChild(document.createTextNode(word));
        }
      });
    } else {
      text.split('').forEach((char) => {
        if (char === ' ') {
          this.element.appendChild(document.createTextNode(char));
        } else {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.textContent = char;
          this.element.appendChild(span);
          this.chars.push(span);
        }
      });
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined' && this.options.resizeCallback) {
      this.observer = new ResizeObserver(() => {
        this.options.resizeCallback(this.element);
      });
      this.observer.observe(this.element);
    }
  }

  getWords(): HTMLElement[] {
    return this.words;
  }

  getChars(): HTMLElement[] {
    return this.chars;
  }

  destroy() {
    this.observer?.disconnect();
  }
}

