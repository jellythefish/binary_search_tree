export default class Pseudocode {
    constructor(container, treeCanvas, timeController) {
        this.container = container;
        this._treeCanvas = treeCanvas;
        this._timeController = timeController;
        this._pseudocodeOperationTitle = document.querySelector('.pseudocode__operation-title');
        this._buttonClose = document.querySelector('.pseudocode__button');
        this._lines = [];
        this.indentSize = 25;
        this.stepSpeed = null; // in seconds
        this.steps = [];
        this._index = 0;
        this.paused = false;
    }

    async renderOperation(index) {
        this._index = index;
        this._treeCanvas.steps = this.steps;
        this._treeCanvas.latestInsertedNode = null;
        this._treeCanvas.latestInsertedEdge = null;
        this.steps.forEach((step) => this._treeCanvas.unhighlightNode(step.currentNode));
        if (index === 0) this._timeController.initializeTimeline(this.steps.length);
        this.stepSpeed = this._timeController.getCurrentStepSpeed();
        for (let i = index; i < this.steps.length; ++i) {
            if (this.paused) return;
            const elem = this.steps[i];
            await this.makeStep(elem.lastStep, elem.currentNode, elem.nodeToInsert);
        }
    }

    makeStep(lastStep, nodeToHighlight, nodeToRender) {
        if (nodeToHighlight) this._treeCanvas.highlightNode(nodeToHighlight);
        this.highlightLine(this._index);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.paused) return;
                this._index++;
                if (nodeToHighlight) this._treeCanvas.unhighlightNode(nodeToHighlight);
                if (nodeToRender) this._treeCanvas.renderElement(nodeToRender.node, nodeToRender.childSide);
                this._timeController.stepForward();
                if (lastStep) this._timeController.renderPlayPause('play');
                resolve();
            }, this.stepSpeed * 1000 * (!lastStep));
        });
    }
    
    initializeInsert() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'insert';
        const lineConstants = [
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
        this._pseudocodeOperationTitle.textContent = 'Вставка вершины';
        this.container.style.height = '400px';
        this.container.style.top = '308px';
        this._buttonClose.style.top = '73px';
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    initializeFind() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = [
            { text: 'Ключ искомой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Если ==: данная вершина есть в дереве.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Поиск окончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        this._pseudocodeOperationTitle.textContent = 'Поиск вершины'
        this.container.style.height = '330px';   
        this.container.style.top = '348px';
        this._buttonClose.style.top = '73px';
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    initializeRemove() {
        const linesElements = this.container.querySelectorAll('.pseudocode__line-container');
        linesElements.forEach((line) => line.remove());
        this.steps = [];
        this._lines = [];
        this._treeCanvas.currentOperation = 'find';
        const lineConstants = [
            { text: 'Ключ удаляемой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
            { text: 'Если ==: рассматриваем детей текущей вершины...', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Если нет ни одного ребенка: удаляем данную вершину', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Если нет только левого ребенка: правый ребенок текущей вершины занимает место текущей вершины, становясь новым ребенком отца текущей вершины.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть нет только правого ребенка: левый ребенок текущей вершины занимает место текущей вершины, становясь новым ребенком отца текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если есть оба ребенка: у правого ребенка удаляемой вершины есть левый ребенок (внук удаляемой вершины)?', indentLevel: 2, highlightColor: '#e7d0ad' },
            { text: 'Нет: правый ребенок текущей вершины занимает место текущей вершины.', indentLevel: 3, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: тогда выполним следующие операции...', indentLevel: 3, highlightColor: '#e7d0ad' }, 
            { text: 'Найдем самого левого ребенка правого ребенка удаляемой вершины.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
            { text: 'Ключ самого левого ребенка становится ключом удаляемой вершины.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
            { text: 'Текущей вершиной для удаления становится самый левый ребенок.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
            { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины для удаления нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' }, 
            { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
            { text: 'Нет: вершины для удаления нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
            { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' },             
            { text: 'Удаление окончено.', indentLevel: 0, highlightColor: '#cf8859' }, 
        ]
        this._pseudocodeOperationTitle.textContent = 'Удаление вершины'
        this.container.style.height = '730px';
        this.container.style.top = '-20px'
        this._buttonClose.style.top = '373px';
        lineConstants.forEach((elem, index) => {
            const line = document.createElement('div'); 
            if (index === 0) line.style['border-top'] = '0.1px solid #c3a27b';
            line.style['border-bottom'] = '0.1px solid #c3a27b';
            line.classList.add('pseudocode__line-container');
            const text = document.createElement('p');
            text.classList.add('pseudocode__line');
            text.textContent = elem.text;
            text.style.margin = `0 0 0 ${elem.indentLevel * this.indentSize}px`;
            line.append(text);
            this.container.append(line);
            this._lines.push({ line, props: elem });
        })
    }

    highlightLine(stepIndex) {
        this.clearLineHighlights()
        const lineNumber = this.steps[stepIndex].index;
        const line = this._lines[lineNumber];
        line.line.style.background = line.props.highlightColor;
        line.line.children[0].style['font-weight'] = '800';
    }

    clearLineHighlights() {
        this._lines.forEach((elem) => {
            elem.line.style.background = '';
            elem.line.children[0].style['font-weight'] = 'normal';
        })
    }
}