function f() {
    let n = 5;
    if (true) {
        let n = 10;
        console.log(n)
    }
    console.log(n)
}
f()