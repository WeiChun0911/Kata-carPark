function escape(carpark) {
    let path = [];
    let startPosition = [];
    let ladder = [];
    let totalFloor = carpark.length;
    let totalCarpark = carpark[0].length;
    let goToLadder = (_start, _ladder) => {
        let leftOrRight = _start - _ladder
        if (leftOrRight !== 0) {
            path.push(leftOrRight > 0 ? 'L' + leftOrRight : 'R' + leftOrRight * -1)
            startPosition[1] = _ladder;
        }
    }
    let goDownLadder = () => {
        if (path[path.length - 1].includes('D')) {
            let temp = path[path.length - 1].split('');
            path[path.length - 1] = temp[0] + (parseInt(temp[1]) + 1);
        } else {
            path.push("D1")
        }
        startPosition[0] += 1;
    }

    carpark.forEach((element, floor) => { //初始化樓層資訊
        if (floor == totalFloor) {
            ladder.push(totalCarpark - 1);
        } else {
            ladder.push(element.indexOf(1));
        }
        if (element.includes(2)) {
            startPosition = [floor, element.indexOf(2)]
        }
    });

    if (totalFloor - startPosition[0] == 1) { //在最下面了，直接找出口
        if (startPosition[1] == totalCarpark - 1) return [];
        goToLadder(startPosition[1], ladder[totalFloor - 1]);
        return path;
    }

    for (let step = totalFloor - startPosition[0]; step > 0; step--) { //在其他樓層
        goToLadder(startPosition[1], ladder[startPosition[0]]); //先找樓梯
        if (step !== 1) {
            goDownLadder(); //如果不是最後一樓，就往下走一樓
        }
    }
    return path;
}

console.log(escape([[0,0,2,0,0]]))