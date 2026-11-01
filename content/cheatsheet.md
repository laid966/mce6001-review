## 🧮 公式速查表

### 收敛与不等式（Part 1–2）
- Markov：$P\{X \geq a\} \leq \frac{E[X]}{a}$（$X \geq 0$）；Chebyshev：$P\{|X-\mu| \geq \epsilon\} \leq \frac{\mathrm{Var}(X)}{\epsilon^2}$
- Chernoff：$P\{Z \geq E[Z]+c\} \leq \inf_{t \geq 0} e^{-t(E[Z]+c)} M_Z(t)$；高斯情形 $= e^{-c^2/(2\sigma^2)}$，$t^*=c/\sigma^2$
- m.s. Cauchy 准则：$X_n \xrightarrow{m.s.} \Leftrightarrow E[(X_n-X_m)^2] \to 0$（$m,n\to\infty$）
- 特征函数：独立和 $\Phi_{\sum X_i} = \prod \Phi_{X_i}$；缩放 $\Phi_{aX+b}(u) = e^{jub}\Phi_X(au)$；$\cos u = \frac{e^{ju}+e^{-ju}}{2}$
- Lévy：$F_n \Rightarrow F \Leftrightarrow \Phi_n(u) \to \Phi(u)$ 逐点且 $\Phi$ 在 0 连续
- CLT 原型：$\big(\cos\frac{u}{\sqrt n}\big)^n \to e^{-u^2/2}$；Taylor：$\cos x = 1 - x^2/2 + o(x^2)$
- Borel–Cantelli：$\sum P(A_n) < \infty \Rightarrow P(A_n\ i.o.) = 0$（a.s. 收敛常用）

### 联合高斯与估计（Part 3）
- 条件分布：$E[X|Y=y] = \mu_X + \frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}(y-\mu_Y)$；$\mathrm{Var}(X|Y) = \mathrm{Var}(X) - \frac{\mathrm{Cov}(X,Y)^2}{\mathrm{Var}(Y)}$
- 联合高斯：不相关 $\Leftrightarrow$ 独立；估计误差 $X - E[X|Y]$ 与 $Y$ 正交（高斯下独立）
- MMSE：$E[X|Y]$ 最小化 MSE；正交原理 $E[(X-\hat X)g(Y)] = 0$
- 线性 MMSE：$\widehat E[X|Y] = \mu_X + \frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}(Y-\mu_Y)$，$\mathrm{MSE} = \mathrm{Var}(X)(1-\rho^2)$
- 新息：$\tilde Y_k = Y_k - \widehat E[Y_k|Y_1,\dots,Y_{k-1}]$；$\mathrm{Cov}(\tilde Y)$ 对角；$\widehat E[X|Y_1..Y_k] = \sum_i \frac{\mathrm{Cov}(X,\tilde Y_i)}{\mathrm{Var}(\tilde Y_i)} \tilde Y_i$
- 常用逆矩阵：$\begin{pmatrix}1 & r\\ r & 1\end{pmatrix}^{-1} = \frac{1}{1-r^2}\begin{pmatrix}1 & -r\\ -r & 1\end{pmatrix}$
- 截断正态均值：$N(m,\sigma^2)$ 截到 $[0,\infty)$：$m + \sigma \frac{\phi(m/\sigma)}{\Phi(m/\sigma)}$

### 随机过程与 Kalman（Part 4）
- 自相关 $R_X(t_1,t_2) = E[X_{t_1}X_{t_2}]$；宽平稳：均值常数 + $R_X$ 只依赖时差
- 泊松过程：$N(t) \sim \mathrm{Poisson}(\lambda t)$；独立增量；到达间隔 $\sim \mathrm{Exp}(\lambda)$
- 标量 Kalman（$H=1$）：
$$K_k = \frac{\Sigma_k^-}{\Sigma_k^- + R},\quad \hat x_k^+ = \hat x_k^- + K_k(y_k - \hat x_k^-),\quad \Sigma_k^+ = (1-K_k)\Sigma_k^-$$
$$\hat x_{k+1}^- = F \hat x_k^+,\quad \Sigma_{k+1}^- = F^2 \Sigma_k^+ + Q$$
- 作业2 P5 特例（$F=f, Q=R=1$）：$K_k = \frac{\sigma_k^2}{1+\sigma_k^2}$，$\sigma_{k+1}^2 = \frac{f^2\sigma_k^2}{1+\sigma_k^2} + 1$

### 常用数值
- $\Phi(0.5) \approx 0.6915$，$\Phi(1) \approx 0.8413$，$\Phi(1.5) \approx 0.9332$，$\Phi(2) \approx 0.9772$，$\Phi(1/\sqrt2) \approx 0.7602$
