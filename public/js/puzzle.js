const GRID_ROWS = 3;
const GRID_COLS = 4;
const TILE_COUNT = GRID_ROWS * GRID_COLS;
const IMAGE_PATH = 'images/cat.jpg';

let tiles = [];
let emptyIndex = TILE_COUNT - 1;
let moveCount = 0;
let isImageLoaded = false;

// 타일 배열 초기화
function initTiles() {
    tiles = [];
    for (let i = 0; i < TILE_COUNT; i++) {
        tiles.push(i);
    }
}

// 타일 크기 가져오기 (CSS 변수에서)
function getTileSize() {
    const rootStyles = getComputedStyle(document.documentElement);
    const tileSizeStr = rootStyles.getPropertyValue('--tile-size').trim();
    return parseInt(tileSizeStr);
}

// 퍼즐 렌더링
function renderPuzzle() {
    const puzzle = document.getElementById('puzzle');
    puzzle.innerHTML = '';
    const tileSize = getTileSize();

    for (let i = 0; i < TILE_COUNT; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';

        if (tiles[i] === TILE_COUNT - 1) {
            tile.classList.add('empty');
            emptyIndex = i;
        } else {
            const row = Math.floor(tiles[i] / GRID_COLS);
            const col = tiles[i] % GRID_COLS;
            tile.style.backgroundImage = `url('${IMAGE_PATH}')`;
            tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
        }

        tile.onclick = () => moveTile(i);
        puzzle.appendChild(tile);
    }

    document.getElementById('moveCount').textContent = moveCount;
}

// 이동 가능한지 확인
function canMove(index) {
    const emptyRow = Math.floor(emptyIndex / GRID_COLS);
    const emptyCol = emptyIndex % GRID_COLS;
    const tileRow = Math.floor(index / GRID_COLS);
    const tileCol = index % GRID_COLS;

    // 같은 행에서 인접하거나 같은 열에서 인접한 경우
    return (emptyRow === tileRow && Math.abs(emptyCol - tileCol) === 1) ||
           (emptyCol === tileCol && Math.abs(emptyRow - tileRow) === 1);
}

// 타일 이동
function moveTile(index) {
    if (!canMove(index)) return;

    // 타일 교환
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    moveCount++;

    renderPuzzle();
    checkWin();
}

// 승리 확인
function checkWin() {
    for (let i = 0; i < TILE_COUNT; i++) {
        if (tiles[i] !== i) return false;
    }

    document.getElementById('winMessage').classList.add('show');
    return true;
}

// 이동 가능한 타일들의 인덱스 가져오기
function getMovableTiles() {
    const movableTiles = [];
    const emptyRow = Math.floor(emptyIndex / GRID_COLS);
    const emptyCol = emptyIndex % GRID_COLS;

    // 상하좌우 확인
    const directions = [
        { row: -1, col: 0 },  // 위
        { row: 1, col: 0 },   // 아래
        { row: 0, col: -1 },  // 왼쪽
        { row: 0, col: 1 }    // 오른쪽
    ];

    for (const dir of directions) {
        const newRow = emptyRow + dir.row;
        const newCol = emptyCol + dir.col;

        if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
            movableTiles.push(newRow * GRID_COLS + newCol);
        }
    }

    return movableTiles;
}

// 퍼즐 섞기 (실제 이동 시뮬레이션)
function shufflePuzzle() {
    document.getElementById('winMessage').classList.remove('show');
    moveCount = 0;

    // 충분히 많이 섞기 (200번 이상 이동)
    const shuffleMoves = 200 + Math.floor(Math.random() * 100);
    let lastMovedIndex = -1;

    for (let i = 0; i < shuffleMoves; i++) {
        const movableTiles = getMovableTiles();

        // 직전 이동을 되돌리는 것 방지 (더 효과적으로 섞기 위해)
        const availableTiles = movableTiles.filter(index => index !== lastMovedIndex);
        const tilesToChooseFrom = availableTiles.length > 0 ? availableTiles : movableTiles;

        // 랜덤하게 타일 선택 및 이동
        const randomIndex = Math.floor(Math.random() * tilesToChooseFrom.length);
        const tileIndex = tilesToChooseFrom[randomIndex];

        lastMovedIndex = emptyIndex;
        [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
        emptyIndex = tileIndex;
    }

    renderPuzzle();
}

// 정답 보기
function solvePuzzle() {
    initTiles();
    moveCount = 0;
    renderPuzzle();
    document.getElementById('winMessage').classList.add('show');
}

// 카운트다운 및 자동 섞기
function startCountdown() {
    const previewMessage = document.getElementById('previewMessage');
    const countdownSpan = document.getElementById('countdown');
    previewMessage.classList.add('show');

    let count = 10;
    countdownSpan.textContent = count;

    const countdownInterval = setInterval(function() {
        count--;
        if (count > 0) {
            countdownSpan.textContent = count;
        } else {
            clearInterval(countdownInterval);
            previewMessage.classList.remove('show');
            shufflePuzzle();
        }
    }, 1000);
}

// 이미지 로드 확인
function loadImage() {
    const img = new Image();
    img.onload = function() {
        isImageLoaded = true;
        initTiles();
        renderPuzzle();
        //startCountdown();
    };
    img.onerror = function() {
        alert('이미지를 불러올 수 없습니다. public/images/cat.jpg 파일이 있는지 확인해주세요.');
    };
    img.src = IMAGE_PATH;
}

// 리사이즈 이벤트 처리 (디바운싱)
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (isImageLoaded) {
            renderPuzzle();
        }
    }, 250);
});

// 페이지 로드 시 초기화
window.onload = function() {
    loadImage();
};
