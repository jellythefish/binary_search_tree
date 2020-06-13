export default class Pseudocode {
    constructor(container) {
        this.container = container;
        this._lines = [];
        this.indentSize = 25;
        this.stepSpeed = 1; // in seconds
    }

    step(index, lastStep) {
        this.clearHighlights();
        this.highlightLine(this._lines[index]);
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), this.stepSpeed * 1000 * (!lastStep));
        });
    }
    
    renderInsert() {
        const lines = [
            { text: 'Дерево пусто?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Да: вставляем корень.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: ключ вставляемой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Нет: вставляем вершину в качестве левого ребенка текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Если ==: данная вершина уже находится в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Нет: вставляем вершину в качестве правого ребенка текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 3, highlightColor: '#fcd462' }, 
            { text: 'Конец вставки.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        lines.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    renderFind() {

    }

    renderRemove() {

    }

    highlightLine(line) {
        line.line.style.background = line.props.highlightColor;
        line.line.children[0].style['font-weight'] = '800';
    }

    clearHighlights() {
        this._lines.forEach((elem) => {
            elem.line.style.background = '';
            elem.line.children[0].style['font-weight'] = 'normal';
        })
    }


    // unhighlightLine(line) {
    //     line.line.style.background = '';
    //     line.line.children[0].style['font-weight'] = 'normal';
    // }
}