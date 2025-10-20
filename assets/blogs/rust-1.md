Learning Rust
=============

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--488dfd459011---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--488dfd459011---------------------------------------)

5 min read

·

Sep 8, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F488dfd459011&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Flearning-rust-488dfd459011&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--488dfd459011---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F488dfd459011&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Flearning-rust-488dfd459011&source=---header_actions--488dfd459011---------------------bookmark_footer------------------)

Listen

Share

> Part — 1

![captionless image](https://miro.medium.com/v2/resize:fit:1128/format:webp/1*O3RLP5WfDL_Af-UdDGi4nw.jpeg)

Decided to learn Rust once again after giving up for the nth time…
This time, instead of learning Rust formally, I thought, why not have some fun while learning it?

Writing a program that sums numbers is probably one of the easiest things to do, so why not do it with a bit of a twist? That was my thought process, and hence this stupid code.

Enjoy!

### Topics discussed here :

1.  **_Taking multiple user inputs and handling them._**
2.  **_using thread-safe global variables._**
3.  **_dealing with interrupts_**

You can get the whole source code here : [Github](https://github.com/psypherion/rustiyapa)

Well, just getting the sum of two numbers is a bit easy, so why not take the sum of multiple numbers?
So, I had two ways to do that.

1.  **Take numbers separated by commas**
2.  **Take numbers one by one
    Just a few days ago I had my DIP exam and there I had to calculate Cumulative Distribution Frequency. Hence inspired from that I went for the second approach.**

### My approach :

1.  User will input value one by one and they will be added to each other therefore the sum.
2.  as there is supposed to be a multiple input operations I decided to create an Input function that will get the value from the user and return it.
3.  a sum function that’ll take those numbers and will add them to each other to create the final sum.
4.  While True loop to run the input and sum operation indefinitely.
5.  A stopping mechanism First I thought of a flag but still there I had to give some conition and a stopping condition that’ll listen for a certain key binding input (say ctrl+c) then after coding and going through the docs I decided to go for just a while True condition loop that listens for the keybindings.

Let’s look into the code :

### input function =>

```
fn input(content:String) -> String{
    print!("{}", content);
    io::stdout().flush().expect("Failed to flush stdout"); 
    let mut buff: String = String::new();
    io::stdin().read_line(&mut buff).expect("Failed to read line");
    return buff.trim().to_string();
}ru
```

an “input” function that takes a string `content:String` and returns a string that’s why
“-> String” .

1.  after printing the prompt string (content) I used flush so that even if anything is stored in the buffer it’ll be shown immediately in the terminal.
2.  A mutable string `buff` is declared.
3.  then a mutable reference (&mut buff) is passed to a string that will store the value from the `read_line` . `read_line` will modify this buffer to include the input data.
4.  then the buff is trimmed to remove white spaces then it’s converted to string.

### SUM function =>

```
fn sum(num:i32) -> i32{
    let mut summed = SUMMED.lock().unwrap();
    *summed += num;
    return *summed;
}
```

1.  It’ll take a i32 value and will return a i32 value
2.  I used a global variable to store the current summation of the numbers.
3.  purpose of lock() :
    1. SUMMED is a global static mutex.
    2. The `lock` method is used to acquire the lock on the `Mutex`. This means that the current thread will gain exclusive access to the data protected by the `Mutex`.
4.  purpose of unwrap() :
    1. handles result type return from lock()

### Mutable Global Variable declaration =>

```
lazy_static::lazy_static! {
    static ref SUMMED: std::sync::Mutex<i32> = std::sync::Mutex::new(0);
}
```

1.  `lazy_static!` is a macro from `lazy_static` crate that defines static variables that are initialized once.
2.  `static ref SUMMED` defines SUMMED static variable lazily.
3.  The `ref` keyword is used here to specify that the variable will be a reference to a lazily-initialized value.
4.  `SUMMED` is a `Mutex` protecting an `i32` value. `Mutex` ensures that only one thread can access or modify the `i32` at a time, providing thread safety for concurrent operations.
5.  Initializes the `Mutex` with the value `0`. The `Mutex` will manage access to this integer, ensuring that concurrent threads cannot simultaneously modify it without synchronization.

Now let’s get into the **main function :**

```
  let running = Arc::new(AtomicBool::new(true));
  let r = running.clone();
```

1. `Arc` (atomic reference-counted pointer) and `AtomicBool` (an atomic boolean) is used to manage a shared, mutable boolean value across threads in a thread-safe way.
2. `Arc::new(AtomicBool::new(true))`: Creates a reference-counted boolean value that can be shared across multiple threads.
3. `running.clone()`: Creates a new reference to the same `Arc`, allowing both references (`r` and `running`) to point to the same atomic boolean.

```
  ctrlc::set_handler(move || {
      println!("\nCtrl+C pressed! Exiting...");
      r.store(false, Ordering::SeqCst); 
  }).expect("Error setting Ctrl+C handler");
```

1.  `ctrlc::set_handler`: This function sets up a handler for the `Ctrl+C` signal
2.  The Closure (`move || { … }`):
    — The closure is the function that will be executed when the `Ctrl+C` signal is caught.
    — The `move` keyword is used to move ownership of any captured variables into the closure. In this case, it captures `r`, which is a clone of the `Arc<AtomicBool>`.
3.  `r.store(false, Ordering::SeqCst)`:
    — `r` is an `Arc<AtomicBool>`, and `store(false, Ordering::SeqCst)` sets the value of the atomic boolean to `false`.
    — `Ordering::SeqCst` stands for sequential consistency, which is the strongest memory ordering. It ensures that all threads see this update in the same order, guaranteeing consistency across threads.
    — By setting the atomic boolean to `false`, the closure signals to other parts of the program (like a loop in the main thread) that the program should stop.

```
while running.load(Ordering::SeqCst) {
     count += 1;
     let content:String = format!("Enter the value of no. {}: ", count);
     let input_str = input(content);
     let num: i32 = match input_str.parse() {
          Ok(n)=>n,
          Err(_)=>{
              println!("No New values are added...");
              continue;
          }
      };
      let x:i32 = sum(num);
      println!("Current Summed Value : {}", x);
  }
  println!("Exiting...");
  exit(0);
```

1.  `while running.load(Ordering::SeqCst)`: The loop runs as long as the atomic `running` flag is `true`. This allows the program to continue until `Ctrl+C` is pressed, which sets `running` to `false`
2.  Input handling: The user’s input is read and parsed into an integer. If parsing fails, an error message is shown, and the loop continues without adding to the sum.
3.  Summing: The valid input is added to the global sum, and the updated sum is printed.
4.  Graceful exit: When the loop exits, it prints “Exiting…” and terminates the program.

### The whole code :

```
use std;
extern crate lazy_static;
extern crate ctrlc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::process::exit;
use std::io::{self, Write};
lazy_static::lazy_static! {
    static ref SUMMED: std::sync::Mutex<i32> = std::sync::Mutex::new(0);
}
fn input(content:String) -> String{
    print!("{}", content);
    io::stdout().flush().expect("Failed to flush stdout"); 
    let mut buff: String = String::new();
    io::stdin().read_line(&mut buff).expect("Failed to read line");
    return buff.trim().to_string();
}
fn sum(num:i32) -> i32{
    let mut summed = SUMMED.lock().unwrap();
    *summed += num;
    return *summed;
}
fn main() {
    let running = Arc::new(AtomicBool::new(true));
    let r = running.clone();
    ctrlc::set_handler(move || {
        println!("\nCtrl+C pressed! Exiting...");
        r.store(false, Ordering::SeqCst); 
    }).expect("Error setting Ctrl+C handler");
    println!("Program started. Press Ctrl+C to exit.");
    let mut count:i8 = 0;
    while running.load(Ordering::SeqCst) {
        count += 1;
        let content:String = format!("Enter the value of no. {}: ", count);
        let input_str = input(content);
        let num: i32 = match input_str.parse() {
            Ok(n)=>n,
            Err(_)=>{
                println!("No New values are added...");
                continue;
            }
        };
        let x:i32 = sum(num);
        println!("Current Summed Value : {}", x);
    }
    println!("Exiting...");
    exit(0);
}
```

Here’s the first part of weirdly written inefficient Rust Program aka I’m learning Rust.
Have a Great Day!