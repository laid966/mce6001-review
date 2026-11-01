# Assignment 2
<meta>截止 10 月 28 日 · 共 5 题 · 100 分 · 主题：联合高斯、新息与 MMSE 估计、Kalman 滤波</meta>

## P1 | 联合高斯：边缘、条件分布与误差概率 | 30 分
<tags>联合高斯, 条件分布, 标准正态 CDF, 估计误差独立</tags>
### 题目
设 $X, Y$ 为零均值联合高斯随机变量，协方差矩阵

$$\mathrm{Cov}\begin{pmatrix} X \\ Y \end{pmatrix} = \begin{pmatrix} 4 & 6 \\ 6 & 18 \end{pmatrix}$$

答案可用标准正态 CDF $\Phi(u) = \int_{-\infty}^{u} \frac{1}{\sqrt{2\pi}} e^{-s^2/2} ds$ 表示。

(a) 求 $P\{|X - 1| \geq 2\}$。
(b) 求给定 $Y = 3$ 时 $X$ 的条件密度。
(c) 求 $P\{|X - E[X \mid Y]| \geq 1\}$。

### 解答
**(a)** $X \sim N(0, 4)$，即 $X = 2Z$，$Z \sim N(0,1)$：

$$P\{|X-1| \geq 2\} = P\{X \geq 3\} + P\{X \leq -1\} = 1 - \Phi\Big(\frac{3}{2}\Big) + \Phi\Big(-\frac{1}{2}\Big) = 2 - \Phi\Big(\frac{1}{2}\Big) - \Phi\Big(\frac{3}{2}\Big) \approx 0.3753$$

**(b)** 零均值联合高斯的条件分布公式：

$$E[X \mid Y = y] = \frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}\, y = \frac{6}{18} y = \frac{y}{3}, \qquad \mathrm{Var}(X \mid Y) = \mathrm{Var}(X) - \frac{\mathrm{Cov}(X,Y)^2}{\mathrm{Var}(Y)} = 4 - \frac{36}{18} = 2$$

故 $X \mid Y=3 \sim N(1, 2)$，即

$$f_{X \mid Y}(x \mid 3) = \frac{1}{2\sqrt{\pi}} \exp\Big(-\frac{(x-1)^2}{4}\Big), \quad x \in \mathbb{R}$$

**(c)** 令 $Z = X - E[X \mid Y] = X - \frac{Y}{3}$：$E[Z] = 0$，

$$\mathrm{Var}(Z) = \mathrm{Var}(X) - 2\cdot\tfrac{1}{3}\mathrm{Cov}(X,Y) + \tfrac{1}{9}\mathrm{Var}(Y) = 4 - 4 + 2 = 2$$

$$\mathrm{Cov}(Z, Y) = \mathrm{Cov}(X,Y) - \tfrac{1}{3}\mathrm{Var}(Y) = 6 - 6 = 0$$

联合高斯 + 不相关 $\Rightarrow$ 独立，故 $Z \sim N(0, 2)$ 且与 $Y$ 独立：

$$P\{|Z| \geq 1\} = P\Big\{\Big|\frac{Z}{\sqrt{2}}\Big| \geq \frac{1}{\sqrt{2}}\Big\} = 2\Big(1 - \Phi\big(\tfrac{1}{\sqrt{2}}\big)\Big) \approx 0.4795$$

### 考点与套路
- **题型识别**：给协方差矩阵的联合高斯三问（边缘概率 / 条件密度 / 估计误差概率）。
- 必背公式：条件均值 $= \mu_X + \frac{\rho\sigma_X}{\sigma_Y}(y-\mu_Y)$（零均值即 $\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}y$）；条件方差 $= \sigma_X^2(1-\rho^2) = \mathrm{Var}(X) - \mathrm{Cov}^2/\mathrm{Var}(Y)$。
- 套路：估计误差 $X - E[X|Y]$ 与 $Y$ 不相关，联合高斯下即独立 $\Rightarrow$ 误差概率化为单变量高斯计算。
- 易错：$\mathrm{Var}(X)=4 \Rightarrow \sigma_X = 2$，标准化时别用方差当标准差。

## P2 | 新息序列（Gram–Schmidt）与正交基下的 MMSE | 30 分
<tags>新息序列, Gram-Schmidt, Cholesky, 正交分解, MMSE 系数</tags>
### 题目
设 $(Y_1, Y_2, Y_3, X)^T$ 为零均值随机向量，协方差矩阵

$$\begin{pmatrix} 1 & 1/2 & 1/2 & 0 \\ 1/2 & 1 & 1/2 & 1/4 \\ 1/2 & 1/2 & 1 & 1/4 \\ 0 & 1/4 & 1/4 & 1 \end{pmatrix}$$

记 $\tilde{Y}_1, \tilde{Y}_2, \tilde{Y}_3$ 为 $Y_1, Y_2, Y_3$ 的线性新息序列（linear innovations sequence），$Y = (Y_1,Y_2,Y_3)^T$，$\tilde{Y} = (\tilde{Y}_1, \tilde{Y}_2, \tilde{Y}_3)^T$。

(a) 求矩阵 $A$ 使 $\tilde{Y} = AY$。
(b) 求 $\mathrm{Cov}(\tilde{Y})$ 与互协方差 $\mathrm{Cov}(X, \tilde{Y}) = E[X\tilde{Y}^T]$。
(c) 求使 $E[(X - a\tilde{Y}_1 - b\tilde{Y}_2 - c\tilde{Y}_3)^2]$ 最小的 $a, b, c$。

### 解答
**(a)** 新息 = 逐步减去最优线性预测（Gram–Schmidt 正交化）：

- $\tilde{Y}_1 = Y_1$；
- $E[Y_2 \mid Y_1]_{lin} = \frac{\mathrm{Cov}(Y_2,Y_1)}{\mathrm{Var}(Y_1)} Y_1 = \frac{1}{2} Y_1 \Rightarrow \tilde{Y}_2 = Y_2 - \frac{1}{2} Y_1$；
- 设 $E[Y_3 \mid Y_1, Y_2]_{lin} = \alpha Y_1 + \beta Y_2$，则 $(\alpha, \beta) = \mathrm{Cov}(Y_3, (Y_1,Y_2))\, \mathrm{Cov}(Y_1,Y_2)^{-1} = (\tfrac12, \tfrac12)\cdot \frac{4}{3}\begin{pmatrix} 1 & -1/2 \\ -1/2 & 1 \end{pmatrix} = (\tfrac13, \tfrac13)$，故 $\tilde{Y}_3 = Y_3 - \frac{1}{3}Y_1 - \frac{1}{3}Y_2$。

$$A = \begin{pmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ -1/3 & -1/3 & 1 \end{pmatrix}$$

**(b)** 新息两两正交 $\Rightarrow \mathrm{Cov}(\tilde{Y})$ 为对角阵：

$$\mathrm{Var}(\tilde{Y}_1) = 1,\quad \mathrm{Var}(\tilde{Y}_2) = 1 - \tfrac{1}{4} = \tfrac{3}{4},\quad \mathrm{Var}(\tilde{Y}_3) = 1 - \big(\tfrac13\cdot\tfrac12 + \tfrac13\cdot\tfrac12\big) = \tfrac{2}{3}$$

$$\mathrm{Cov}(\tilde{Y}) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 3/4 & 0 \\ 0 & 0 & 2/3 \end{pmatrix}$$

互协方差逐项展开（用 $\mathrm{Cov}(X,Y_1)=0$，$\mathrm{Cov}(X,Y_2)=\mathrm{Cov}(X,Y_3)=\tfrac14$）：

$$\mathrm{Cov}(X,\tilde{Y}) = \Big(0,\ \tfrac14 - \tfrac12\cdot 0,\ \tfrac14 - \tfrac13\cdot 0 - \tfrac13\cdot\tfrac14\Big) = \Big(0,\ \frac{1}{4},\ \frac{1}{6}\Big)$$

**(c)** $\tilde{Y}$ 正交（对角协方差）$\Rightarrow$ 三个系数可分别优化：展开平方并求导得 $a_i = \mathrm{Cov}(X, \tilde{Y}_i)/\mathrm{Var}(\tilde{Y}_i)$：

$$a = \frac{0}{1} = 0, \qquad b = \frac{1/4}{3/4} = \frac{1}{3}, \qquad c = \frac{1/6}{2/3} = \frac{1}{4}$$

（最小 MSE $= \mathrm{Var}(X) - \sum_i \frac{\mathrm{Cov}(X,\tilde{Y}_i)^2}{\mathrm{Var}(\tilde{Y}_i)} = 1 - 0 - \frac{1/16}{3/4} - \frac{1/36}{2/3} = \frac{7}{8}$。）

### 考点与套路
- **题型识别**：给协方差矩阵求新息序列 / 正交化 / 线性估计系数。
- 套路：① 新息递推 $\tilde{Y}_k = Y_k - \widehat{E}[Y_k \mid Y_1,\dots,Y_{k-1}]$，系数 = 协方差向量 $\times$ 协方差矩阵之逆；② 新息协方差必为对角阵（可用 $\mathrm{Var}(Y_k) - $ 预测方差 快速算）；③ 正交基下 MMSE 系数逐项 $= \mathrm{Cov}/\mathrm{Var}$，无需解联立方程。
- 易错：$2\times 2$ 逆矩阵别算错：$\begin{pmatrix}1 & 1/2\\1/2 & 1\end{pmatrix}^{-1} = \frac{4}{3}\begin{pmatrix}1 & -1/2\\-1/2 & 1\end{pmatrix}$。

## P3 | 条件期望的基本性质：$X$ 是 $U$ 的函数 | 10 分
<tags>条件期望, 可测性, MSE 为 0</tags>
### 题目
设 $X = \frac{1}{1+U}$，其中 $U \sim U[0,1]$。求条件期望 $E[X \mid U]$ 与均方误差 $E[(X - E[X \mid U])^2]$。

### 解答
$X = g(U)$，$g(u) = \frac{1}{1+u}$ 是 Borel 函数，故 $X$ 是 $\sigma(U)$-可测的（"已知 $U$ 就完全知道 $X$"）：

$$E[X \mid U] = X = \frac{1}{1+U}, \qquad \mathrm{MSE} = E[(X - E[X\mid U])^2] = 0$$

### 考点与套路
- **题型识别**：被估计量本身就是观测的函数。
- 套路：$X = g(U) \Rightarrow E[X|U] = g(U)$，MSE $= 0$。送分题，别想复杂。

## P4 | 线性 MMSE（$\widehat{E}[X|Y]$）与精确 MMSE 对照 | 10 分
<tags>线性 MMSE, 正交原理, 截断正态, 贝叶斯后验</tags>
### 题目
设 $Y = X + N$，$X$ 与 $N$ 独立，$N \sim N(0, \sigma^2)$，$X \sim \mathrm{Exp}(\lambda)$，$\lambda > 0$，$\sigma^2 > 0$。求 $\widehat{E}[X \mid Y]$ 及用 $\widehat{E}[X \mid Y]$ 估计 $X$ 的均方误差。（提示：$E[X] = 1/\lambda$，$\mathrm{Var}(X) = 1/\lambda^2$。）

### 解答
**主解（线性 MMSE，即提示所指）：** 帽子记号 $\widehat{E}[X \mid Y]$ 表示**线性**最小均方估计，只需一、二阶矩：

$$E[Y] = \frac{1}{\lambda},\quad \mathrm{Cov}(X,Y) = \mathrm{Var}(X) = \frac{1}{\lambda^2},\quad \mathrm{Var}(Y) = \mathrm{Var}(X) + \mathrm{Var}(N) = \frac{1}{\lambda^2} + \sigma^2$$

$$\widehat{E}[X \mid Y] = E[X] + \frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}\big(Y - E[Y]\big) = \frac{1}{\lambda} + \frac{1}{1 + \lambda^2\sigma^2}\Big(Y - \frac{1}{\lambda}\Big)$$

$$\mathrm{MSE} = \mathrm{Var}(X) - \frac{\mathrm{Cov}(X,Y)^2}{\mathrm{Var}(Y)} = \frac{1}{\lambda^2} - \frac{1/\lambda^4}{1/\lambda^2 + \sigma^2} = \frac{\sigma^2}{1 + \lambda^2 \sigma^2}$$

**附：精确 MMSE $E[X \mid Y]$（提交版答案的推导，供对照）：** 由 Bayes 公式，后验密度

$$f_{X \mid Y}(x \mid y) \propto \lambda e^{-\lambda x} \cdot \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(y-x)^2}{2\sigma^2}} \mathbf{1}\{x \geq 0\}$$

指数配方：$-\lambda x - \frac{(y-x)^2}{2\sigma^2} = -\frac{(x-m)^2}{2\sigma^2} + \text{const}$，其中 $m = y - \lambda\sigma^2$。故 $(X \mid Y=y)$ 是 $N(m, \sigma^2)$ 截断到 $[0, \infty)$ 的分布，记 $u = m/\sigma$，$R(u) = \phi(u)/\Phi(u)$（逆 Mills 比）：

$$E[X \mid Y=y] = m + \sigma R(m/\sigma), \qquad \mathrm{Var}(X \mid Y=y) = \sigma^2\big(1 - uR(u) - R(u)^2\big)$$

总 MSE $= E[\mathrm{Var}(X \mid Y)]$（需对 $Y$ 的密度积分，无闭式）。考试若只给一、二阶矩提示，写线性 MMSE 即可。

### 考点与套路
- **题型识别**：$\widehat{E}$（带帽）= 线性 MMSE；$E[X|Y]$（不带帽）= 精确 MMSE（后验均值）。
- 必背：线性 MMSE 公式 $\widehat{E}[X|Y] = \mu_X + \frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(Y-\mu_Y)$，MSE $= \sigma_X^2(1-\rho^2)$。
- 独立和的协方差技巧：$\mathrm{Cov}(X, X+N) = \mathrm{Var}(X)$。
- 进阶：指数先验 + 高斯噪声 $\Rightarrow$ 截断正态后验（逆 Mills 比），认得即可。

## P5 | 标量 Kalman 滤波递推 | 20 分
<tags>Kalman 滤波, 新息, Riccati 递推, 预测-更新</tags>
### 题目
对 $k \geq 0$，状态与观测（标量）序列：

$$x_{k+1} = f x_k + w_k, \qquad y_k = x_k + v_k$$

其中 $f \in \mathbb{R}$，$x_0 \sim N(0, \sigma^2)$，$\sigma^2 > 0$；$x_0, w_0, v_0, w_1, v_1, \dots$ 相互独立，且 $w_k, v_k \sim N(0, 1)$。写出递推计算估计 $\hat{x}_{k+1 \mid k}$、增益 $K_k$、误差方差序列 $\sigma^2_{k+1} := \mathrm{Cov}(x_{k+1} - \hat{x}_{k+1 \mid k})$ 的 Kalman 滤波方程。

### 解答
系统参数：$Q = \mathrm{Var}(w) = 1$，$R = \mathrm{Var}(v) = 1$，$H = 1$，状态转移 $F = f$。初值：$\hat{x}_{0 \mid -1} = E[x_0] = 0$，$\sigma^2_0 = \mathrm{Cov}(x_0 - \hat{x}_{0|-1}) = \sigma^2$。

**更新（update）**：已知 $\hat{x}_{k \mid k-1}$ 与 $\sigma^2_k$，新息 $y_k - \hat{x}_{k \mid k-1}$ 的方差为 $\sigma^2_k + R = \sigma^2_k + 1$：

$$K_k = \frac{\sigma^2_k}{\sigma^2_k + 1}, \qquad \hat{x}_{k \mid k} = \hat{x}_{k \mid k-1} + K_k\big(y_k - \hat{x}_{k \mid k-1}\big), \qquad \mathrm{Cov}(x_k - \hat{x}_{k \mid k}) = (1 - K_k)\sigma^2_k = \frac{\sigma^2_k}{\sigma^2_k + 1}$$

**预测（predict）**：由 $x_{k+1} = f x_k + w_k$：

$$\hat{x}_{k+1 \mid k} = f\, \hat{x}_{k \mid k}, \qquad \sigma^2_{k+1} = f^2 (1 - K_k)\sigma^2_k + 1 = \frac{f^2 \sigma^2_k}{1 + \sigma^2_k} + 1$$

**合并为一步递推**（$k \geq 0$，初值 $\hat{x}_{0|-1} = 0$，$\sigma^2_0 = \sigma^2$）：

$$\boxed{\ \hat{x}_{k+1 \mid k} = f\Big(\hat{x}_{k \mid k-1} + K_k\big(y_k - \hat{x}_{k \mid k-1}\big)\Big),\quad K_k = \frac{\sigma^2_k}{1 + \sigma^2_k},\quad \sigma^2_{k+1} = \frac{f^2 \sigma^2_k}{1 + \sigma^2_k} + 1\ }$$

### 考点与套路
- **题型识别**：给标量状态空间模型，写 KF 递推（更新-预测两步 + Riccati 方差递推）。
- 必背模板（标量，$H=1$）：$K = \frac{\Sigma^-}{\Sigma^- + R}$；$\hat{x}^+ = \hat{x}^- + K(y - \hat{x}^-)$；$\Sigma^+ = (1-K)\Sigma^-$；$\hat{x}^-_{k+1} = F\hat{x}^+_k$；$\Sigma^-_{k+1} = F^2 \Sigma^+_k + Q$。
- 易错：初值下标（$\hat{x}_{0|-1}$）、$Q$ 与 $R$ 别代反；方差递推与增益递推要自洽。
