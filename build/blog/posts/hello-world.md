---
title: "Hello World"
date: "2026-02-24"
tags: ["meta"]
description: "First post on the new site. Testing markdown and LaTeX rendering."
---

## Welcome

This is the first post on my new blog. I'll be writing about software engineering, systems programming, and whatever else I find interesting.

## LaTeX Support

This blog supports inline math like $E = mc^2$ and display equations:

$$
\int_0^\infty e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
$$

Here's a matrix:

$$
A = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}
$$

## Code Blocks

Code highlighting works too:

```python
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

## Tables

| Feature | Supported |
|---------|-----------|
| Markdown | Yes |
| LaTeX Math | Yes |
| Code Highlighting | Yes |
| Images | Yes |
| GFM Tables | Yes |

More posts coming soon.
