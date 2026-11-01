# Assignment 1
<meta>截止 9 月 30 日 · 共 5 题 · 100 分 · 主题：随机变量序列的四种收敛</meta>

## P1 | 均方收敛的充要条件（Cauchy 准则应用） | 10 分
<tags>均方收敛, Cauchy 准则, 独立零均值, 方差级数</tags>
### 题目
设 $X_1, X_2, \dots$ 为相互独立的随机变量，满足 $E[X_i] = 0$，$E[X_i^2] < \infty$，定义 $S_n = \sum_{i=1}^{n} X_i$。

证明：$(S_n)_{n \geq 1}$ 均方收敛（converges in mean square）当且仅当 $\sum_{i=1}^{\infty} \mathrm{Var}(X_i) < \infty$。

> 提示：应用均方收敛的 Cauchy 准则。

### 解答
**关键恒等式。** 设 $n > m$，则 $S_n - S_m = \sum_{i=m+1}^{n} X_i$，于是

$$E[(S_n - S_m)^2] = E\Big[\Big(\sum_{i=m+1}^{n} X_i\Big)^2\Big] = \sum_{i=m+1}^{n} E[X_i^2] + 2 \sum_{m+1 \leq i < j \leq n} E[X_i X_j]$$

由独立性，当 $i \neq j$ 时 $E[X_i X_j] = E[X_i]E[X_j] = 0$；又 $E[X_i] = 0$ 故 $E[X_i^2] = \mathrm{Var}(X_i)$。因此

$$E[(S_n - S_m)^2] = \sum_{i=m+1}^{n} \mathrm{Var}(X_i)$$

**（$\Leftarrow$）** 若 $\sum_{i=1}^{\infty} \mathrm{Var}(X_i) < \infty$，记部分和 $T_n = \sum_{i=1}^{n} \mathrm{Var}(X_i)$。收敛级数的尾部趋于 0：当 $m, n \to \infty$（$n>m$）时 $\sum_{i=m+1}^{n} \mathrm{Var}(X_i) = T_n - T_m \to 0$，即 $E[(S_n - S_m)^2] \to 0$。由均方收敛的 Cauchy 准则，$(S_n)$ 均方收敛。

**（$\Rightarrow$）** 若 $(S_n)$ 均方收敛，由 Cauchy 准则 $\lim_{m,n \to \infty} E[(S_n - S_m)^2] = 0$，即 $\lim_{m,n\to\infty} \sum_{i=m+1}^{n} \mathrm{Var}(X_i) = 0$。这说明实数列 $(T_n)$ 满足 Cauchy 条件（$|T_n - T_m| = \sum_{i=m+1}^{n}\mathrm{Var}(X_i) \to 0$），由 $\mathbb{R}$ 的完备性 $\lim_{n\to\infty} T_n = \sum_{i=1}^{\infty} \mathrm{Var}(X_i)$ 存在且有限。$\blacksquare$

### 考点与套路
- **题型识别**：证明"部分和均方收敛 $\Leftrightarrow$ 方差级数收敛"，独立 + 零均值是消去交叉项的钥匙。
- 套路：① 展开 $E[(S_n-S_m)^2]$；② 用独立零均值把交叉项化为 0；③ 两端分别套 Cauchy 准则（L2 完备性）。
- 易错：忘记 $E[X_i]=0$ 时 $E[X_i^2]=\mathrm{Var}(X_i)$；只证一个方向。

## P2 | 特征函数 + 四种收敛的判定（Rademacher 和） | 30 分
<tags>特征函数, 独立和, 四种收敛, Lévy 连续性定理, 中心极限</tags>
### 题目
设 $X_1, X_2, \dots$ 相互独立，$P\{X_i = 1\} = P\{X_i = -1\} = \tfrac{1}{2}$。定义 $S_n = \sum_{i=1}^{n} X_i$，$V_n = \dfrac{S_n}{\sqrt{n}}$，记 $\Phi_Z(u) = E[e^{juZ}]$ 为特征函数。

(a) 求 $\Phi_{X_1}$、$\Phi_{S_n}$、$\Phi_{V_n}$。（提示：$\cos u = \frac{e^{ju} + e^{-ju}}{2}$）

(b) 对每个固定的 $u \in \mathbb{R}$，判断 $\Phi_{S_n}(u)$ 与 $\Phi_{V_n}(u)$ 是否收敛；若收敛求极限。

(c) 判断 $(S_n)_{n\geq 1}$ 是否几乎必然收敛、均方收敛、依概率收敛、依分布收敛；若收敛指出极限，并证明所有收敛与不收敛的结论。

### 解答
**(a)** 直接计算：

$$\Phi_{X_1}(u) = e^{ju}\cdot\tfrac{1}{2} + e^{-ju}\cdot\tfrac{1}{2} = \cos u$$

由独立性，$\Phi_{S_n}(u) = \prod_{i=1}^{n} E[e^{juX_i}] = (\cos u)^n$；再由缩放性质 $\Phi_{V_n}(u) = \Phi_{S_n}\big(\tfrac{u}{\sqrt{n}}\big) = \big(\cos \tfrac{u}{\sqrt{n}}\big)^n$。

**(b)** 对 $\Phi_{S_n}(u) = (\cos u)^n$ 分三类：

- $u = 2k\pi$（$k \in \mathbb{Z}$）：$\cos u = 1$，极限为 $1$；
- $u = (2k+1)\pi$：$\cos u = -1$，$( -1 )^n$ 振荡，**极限不存在**；
- 其余 $u$：$|\cos u| < 1$，极限为 $0$。

故 $\Phi_{S_n}(u)$ 并非对每个 $u$ 都收敛。对 $\Phi_{V_n}(u)$，用 Taylor 展开 $\cos\tfrac{u}{\sqrt{n}} = 1 - \tfrac{u^2}{2n} + o(\tfrac{1}{n})$：

$$\lim_{n\to\infty} \Big(\cos \tfrac{u}{\sqrt{n}}\Big)^n = \lim_{n\to\infty} \Big(1 - \frac{u^2}{2n} + o(\tfrac1n)\Big)^n = e^{-u^2/2}$$

即对一切 $u$ 收敛到标准正态的特征函数。

**(c)** 结论：**四种收敛全部不成立。**

- **几乎必然：否。** 若 $S_n \xrightarrow{a.s.} S$，则 $X_n = S_n - S_{n-1} \xrightarrow{a.s.} 0$；但 $|X_n| = 1$ 恒成立，矛盾。
- **均方：否。** $E[(S_n - S_m)^2] = \sum_{i=m+1}^{n} E[X_i^2] = n - m$（交叉项为 0）。取 $n = 2m$ 得 $E[(S_{2m}-S_m)^2] = m \to \infty$，不满足 Cauchy 准则。
- **依分布：否。** 若 $S_n \xrightarrow{d} S$，由 Lévy 连续性定理 $\Phi_{S_n}(u) \to \Phi_S(u)$ 对每个 $u$ 成立；但 $u = \pi$ 处 $(\cos\pi)^n = (-1)^n$ 不收敛，矛盾。
- **依概率：否。** 依概率收敛必依分布收敛，而依分布不收敛。

（对比：$V_n \xrightarrow{d} N(0,1)$，由 (b) 与 Lévy 连续性定理——这就是中心极限定理的特例。）

### 考点与套路
- **题型识别**：给独立同分布简单随机变量，问部分和/缩放和的各种收敛性。
- 套路：① 特征函数：独立和 = 乘积，缩放 $\Phi_{aX}(u)=\Phi_X(au)$；② 判"不收敛"优先找特征函数在某点不收敛（否掉 d，从而否掉 p）；③ 否掉 a.s. 用"增量不趋于 0"；④ 否掉 m.s. 用 Cauchy 准则算 $E[(S_n-S_m)^2]$。
- 必背关系链：$a.s. \Rightarrow p \Rightarrow d$；$m.s. \Rightarrow p \Rightarrow d$；反之均不成立；$(\cos\tfrac{u}{\sqrt n})^n \to e^{-u^2/2}$ 是 CLT 的原型计算。

## P3 | Chernoff 界（Markov 不等式 + 优化） | 20 分
<tags>Markov 不等式, 矩母函数, Chernoff 界, 指数倾斜优化</tags>
### 题目
(a) 设 $Z$ 均值有限，矩母函数 $M_Z(t) = E[e^{tZ}]$ 对一切 $t \geq 0$ 有限。用 Markov 不等式证明 Chernoff 界：

$$P\{Z \geq E[Z] + c\} \leq e^{-t(E[Z]+c)} M_Z(t), \quad c \geq 0,\ t \geq 0$$

(b) 设 $Z \sim N(\mu, \sigma^2)$，$\sigma > 0$。对每个 $c \geq 0$，求 (a) 中最优的 Chernoff 界及取到最优的 $t$。

### 解答
**(a)** 因 $t \geq 0$ 时 $z \mapsto e^{tz}$ 单调递增，事件等价：$\{Z \geq E[Z]+c\} = \{e^{tZ} \geq e^{t(E[Z]+c)}\}$。又 $e^{tZ} \geq 0$，对非负随机变量用 Markov 不等式：

$$P\{Z \geq E[Z]+c\} = P\{e^{tZ} \geq e^{t(E[Z]+c)}\} \leq \frac{E[e^{tZ}]}{e^{t(E[Z]+c)}} = e^{-t(E[Z]+c)} M_Z(t)$$

**(b)** 高斯的矩母函数 $M_Z(t) = e^{\mu t + \frac{1}{2}\sigma^2 t^2}$，代入得界 $e^{-t(\mu+c)} \cdot e^{\mu t + \frac12 \sigma^2 t^2} = e^{\frac{1}{2}\sigma^2 t^2 - tc}$。令 $g(t) = \tfrac{1}{2}\sigma^2 t^2 - tc$，$g'(t) = \sigma^2 t - c = 0 \Rightarrow t^* = \dfrac{c}{\sigma^2} \geq 0$，且 $g(t^*) = -\dfrac{c^2}{2\sigma^2}$。故最优界为

$$P\{Z \geq \mu + c\} \leq e^{-c^2/(2\sigma^2)}, \quad t^* = c/\sigma^2$$

### 考点与套路
- **题型识别**：尾概率上界 + "优化界"字样 $\Rightarrow$ Chernoff/指数倾斜。
- 套路：① 单调变换把事件变成非负随机变量的事件；② Markov：$P\{W \geq a\} \leq E[W]/a$；③ 对 $t$ 求导（或配方）最小化指数。
- 易错：Markov 要求非负随机变量；忘记验证 $t^* \geq 0$。

## P4 | 连续映射定理与反例（a.s. 收敛的函数变换） | 20 分
<tags>连续映射定理, 几乎必然收敛, 反例构造, 不连续函数</tags>
### 题目
设 $X_n \xrightarrow{a.s.} X$，$g: \mathbb{R} \to \mathbb{R}$ 连续，并定义

$$h(x) = \begin{cases} -1, & x \leq 0 \\ 1, & x > 0 \end{cases}$$

对下列序列，几乎必然极限是否一定存在？若一定，指出极限并证明；若不一定，给出变换后序列不几乎必然收敛的反例。

(a) $(g(X_n))_{n \geq 1}$；(b) $(h(X_n))_{n \geq 1}$。

### 解答
**(a) 一定存在，极限为 $g(X)$。** 由 a.s. 收敛，存在事件 $\Omega_0$，$P(\Omega_0) = 1$，使对每个 $\omega \in \Omega_0$ 有 $\lim_n X_n(\omega) = X(\omega)$。$g$ 在 $\mathbb{R}$ 上连续（逐点连续即可），故对同一批 $\omega$：$\lim_n g(X_n(\omega)) = g(X(\omega))$。即 $g(X_n) \xrightarrow{a.s.} g(X)$。（连续映射定理。）

**(b) 不一定。反例：** 取 $X \equiv 0$，$X_n = \frac{(-1)^n}{n}$。则 $X_n \xrightarrow{a.s.} 0$（确定性收敛）。但

- $n$ 为偶数：$X_n = \tfrac{1}{n} > 0 \Rightarrow h(X_n) = 1$；
- $n$ 为奇数：$X_n = -\tfrac{1}{n} \leq 0 \Rightarrow h(X_n) = -1$。

于是 $h(X_n) = (-1)^n$ 振荡，不收敛（任何意义下），故 a.s. 极限不存在。$\blacksquare$

### 考点与套路
- **题型识别**："连续函数保持收敛 / 不连续函数呢？"
- 套路：连续 $\Rightarrow$ 直接引用连续映射定理（对 a.s./p/d 都成立，d 版本要求极限点连续）；不连续 $\Rightarrow$ 构造在间断点两侧反复横跳的序列（符号交替 $(-1)^n/n$ 是标准反例）。
- 易错：反例必须满足 $X_n \xrightarrow{a.s.} X$ 且 $X$ 落在 $h$ 的间断点上。

## P5 | 三角函数序列的收敛性（$\cos(n\Theta)$ 与几何衰减） | 20 分
<tags>均匀分布, 稠密性, Cauchy 准则, 依分布收敛, 同分布序列</tags>
### 题目
设 $\Theta \sim U[0, 2\pi)$。判断下列序列是否几乎必然、均方、依概率、依分布收敛；若收敛指出极限并证明所有结论。

(a) $X_n = \cos(n\Theta)$；(b) $Y_n = |1 - \Theta/\pi|^n$。

### 解答
**(a) $X_n = \cos(n\Theta)$：a.s. 否、m.s. 否、p 否、d 是（极限为 $\cos\Theta$ 的分布）。**

- **a.s. 否**：对几乎每个 $\theta$（$\theta/2\pi$ 非有理数倍时），序列 $\{n\theta \bmod 2\pi\}$ 在 $[0, 2\pi]$ 中稠密，故 $\cos(n\theta)$ 在 $[-1,1]$ 内无限振荡，极限不存在。
- **m.s. 否**：$E[X_n] = 0$，$E[X_n^2] = \tfrac{1}{2}$；$n \neq m$ 时积化和差得 $E[X_n X_m] = \tfrac12 E[\cos((n-m)\Theta) + \cos((n+m)\Theta)] = 0$。故 $E[(X_n - X_m)^2] = 1 \not\to 0$，Cauchy 准则失败。
- **d 是**：对任意整数 $n \geq 1$，$n\Theta \bmod 2\pi \sim U[0,2\pi)$，故 $X_n$ 与 $\cos\Theta$ **同分布**；同分布序列当然依分布收敛：$X_n \xrightarrow{d} \cos\Theta$（其密度为 $\frac{1}{\pi\sqrt{1-x^2}}$，$x \in (-1,1)$）。
- **p 否**：若 $X_n \xrightarrow{p} X$，则 $X_{2n} - X_n \xrightarrow{p} 0$；但 $|X_{2n}-X_n| \leq 2$ 有界，依概率收敛 + 有界 $\Rightarrow$ 均方收敛，与 $E[(X_{2n}-X_n)^2] = 1$ 矛盾。（也可用"p 收敛则存在 a.s. 收敛子列 + 振荡论证"。）

**(b) $Y_n = |1-\Theta/\pi|^n$：四种收敛全部成立，极限为 0。** 记 $W = |1 - \Theta/\pi| \in [0, 1]$，且 $W = 1$ 仅当 $\Theta = 0$（零概率），故 $W < 1$ a.s.，从而 $Y_n = W^n \xrightarrow{a.s.} 0$。均方：换元 $w = 1 - \theta/\pi$ 得

$$E[Y_n^2] = \frac{1}{2\pi}\int_0^{2\pi} |1-\theta/\pi|^{2n} d\theta = \frac{1}{2}\int_{-1}^{1} w^{2n} dw = \frac{1}{2n+1} \to 0$$

故也均方收敛；由关系链亦依概率、依分布收敛到 0。

### 考点与套路
- **题型识别**：含 $\Theta \sim U[0,2\pi)$ 的三角/幂次序列。
- 套路：① $\cos(n\Theta)$ 族：正交性 $E[\cos(n\Theta)\cos(m\Theta)] = 0$（$n\neq m$）、$E[\cos^2] = \tfrac12$、$n\Theta \bmod 2\pi$ 同分布；② $|\cdot|^n$ 族：底数 a.s. 小于 1 $\Rightarrow$ 几何衰减到 0，用控制收敛/直接积分证 m.s.；③ 否掉 p 用"有界 + p 收敛 $\Rightarrow$ m.s. 收敛"或关系链。
- 易错：(a) 的依分布**是收敛的**（同分布序列），不要和"不收敛于常数"混淆。
