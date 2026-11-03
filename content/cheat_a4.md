# MCE6001 随机过程 · 一页小抄
<meta>赵铖城 226010078 · Fall 26 · 正面：官方解答缩印 · 背面：考点总结与记背公式定理 · 一张 A4 双面</meta>

## 考点 1 | 均方收敛与 Cauchy 准则（作业1-P1）
- **记背**：m.s. 定义 $E[(X_n-X)^2]\to0$；Cauchy 准则 $\lim_{m,n\to\infty}E[(X_n-X_m)^2]=0$ ⇔ m.s. 收敛（L2 完备，不需知极限）；独立零均值 $\Rightarrow E[(S_n-S_m)^2]=\sum_{i=m+1}^n\mathrm{Var}(X_i)$；结论 $S_n$ m.s. 收敛 ⇔ $\sum_{i=1}^\infty\mathrm{Var}(X_i)<\infty$。
- **套路**：展开平方→独立/零均值杀交叉项→双向套 Cauchy。
- **易错**：只证单向；忘 $E[X_i]=0\Rightarrow E[X_i^2]=\mathrm{Var}(X_i)$。

## 考点 2 | 特征函数与四种收敛判定（作业1-P2、P5）
- **记背**：$\Phi_Z(u)=E[e^{juZ}]$；独立和⇒相乘；$\Phi_{aX+b}(u)=e^{jub}\Phi_X(au)$；$\cos u=\frac{e^{ju}+e^{-ju}}2$⇒Rademacher $\Phi_{S_n}=(\cos u)^n$；$(\cos\frac{u}{\sqrt n})^n\to e^{-u^2/2}$（CLT 原型）；Lévy 连续性定理（d⇔$\Phi$ 逐点→0 处连续）；收敛链 $a.s.\Rightarrow p\Rightarrow d$、$m.s.\Rightarrow p\Rightarrow d$，反之均不成立；有界+p⇒m.s.；p⇒存在 a.s. 子列；d 且极限常数⇒p。
- **判定清单**：a.s. 看增量/逐点（稠密振荡）；m.s. 看 Cauchy/二阶矩；p 看定义界或借 d；d 看特征函数/CDF/**同分布⇒d 收敛到该分布**。
- **易错**：$(\cos u)^n$ 在 $u=(2k+1)\pi$ 为 $(-1)^n$ 不收敛⇒否 d 从而否 p；$\cos(n\Theta)$ 依分布**是**收敛的。

## 考点 3 | 尾概率界（作业1-P3）
- **记背**：Markov $P\{Y\ge a\}\le E[Y]/a$（$Y\ge0$）；Chebyshev $P\{|X-\mu|\ge\epsilon\}\le\sigma^2/\epsilon^2$；Chernoff $P\{Z\ge E[Z]+c\}\le e^{-t(E[Z]+c)}M_Z(t)$；高斯 $M_Z(t)=e^{\mu t+\sigma^2t^2/2}$⇒最优界 $e^{-c^2/(2\sigma^2)}$、$t^*=c/\sigma^2$。
- **套路**：事件指数化（单调）→Markov→对 $t$ 求导/配方优化。
- **易错**：Markov 要求非负；验证 $t^*\ge0$；下尾需 $t\le0$。

## 考点 4 | 函数变换的收敛（作业1-P4）
- **记背**：连续映射定理：$g$ 连续⇒a.s./p 收敛保持；d 版本需 $P\{X\in D_g\}=0$。
- **反例模板**：$X_n=(-1)^n/n\xrightarrow{a.s.}0$，阶跃 $h\Rightarrow h(X_n)=(-1)^n$ 不收敛。
- **易错**：反例的极限点必须落在 $g$ 的间断点上。

## 考点 5 | 联合高斯（作业2-P1）
- **记背**：$E[X|Y=y]=\mu_X+\frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}(y-\mu_Y)$；$\mathrm{Var}(X|Y)=\mathrm{Var}(X)-\frac{\mathrm{Cov}(X,Y)^2}{\mathrm{Var}(Y)}$；不相关⇔独立；误差 $X-E[X|Y]$ ⊥ 观测⇒独立；条件方差与 $y$ 无关；$\Phi(.5)=.6915$，$\Phi(1)=.8413$，$\Phi(1.5)=.9332$，$\Phi(2)=.9772$，$\Phi(1/\sqrt2)=.7602$。
- **套路**：协方差矩阵读均值方差→条件公式→误差概率化单变量高斯标准化。
- **易错**：$\mathrm{Var}=4\Rightarrow\sigma=2$，别把方差当标准差。

## 考点 6 | 新息序列与正交 MMSE（作业2-P2）
- **记背**：$\tilde Y_k=Y_k-\widehat E[Y_k|Y_1..Y_{k-1}]$；$\mathrm{Cov}(\tilde Y)$ 对角，$\mathrm{Var}(\tilde Y_k)=\mathrm{Var}(Y_k)-$预测方差；$\widehat E[X|Y_1..Y_n]=\sum_i\frac{\mathrm{Cov}(X,\tilde Y_i)}{\mathrm{Var}(\tilde Y_i)}\tilde Y_i$；$\mathrm{MSE}=\mathrm{Var}(X)-\sum_i\frac{\mathrm{Cov}(X,\tilde Y_i)^2}{\mathrm{Var}(\tilde Y_i)}$；$\begin{pmatrix}1&r\\r&1\end{pmatrix}^{-1}=\frac1{1-r^2}\begin{pmatrix}1&-r\\-r&1\end{pmatrix}$。
- **套路**：Gram–Schmidt 逐步减预测→对角化→系数逐项 $\mathrm{Cov}/\mathrm{Var}$。
- **易错**：2×2 逆矩阵符号；交叉协方差逐项展开别漏项。

## 考点 7 | 条件期望（作业2-P3 + 性质全单）
- **记背**：$X=g(U)\Rightarrow E[X|U]=X$、MSE=0；$E[E[X|Y]]=E[X]$；取出已知 $E[g(Y)X|Y]=g(Y)E[X|Y]$；塔式 $E[E[X|Y,Z]|Y]=E[X|Y]$；全方差 $\mathrm{Var}(X)=E[\mathrm{Var}(X|Y)]+\mathrm{Var}(E[X|Y])$；$\mathrm{Var}(X|Y)=E[X^2|Y]-(E[X|Y])^2$；正交 $E[(X-E[X|Y])h(Y)]=0$。
- **套路**：先看可测性（是否观测的函数）→否则用联合密度积分或性质链。

## 考点 8 | 线性 MMSE 与精确 MMSE（作业2-P4）
- **记背**：$\widehat E[X|Y]=\mu_X+\frac{\mathrm{Cov}(X,Y)}{\mathrm{Var}(Y)}(Y-\mu_Y)$；$\mathrm{MSE}=\mathrm{Var}(X)(1-\rho^2)$；$\mathrm{Cov}(X,X+N)=\mathrm{Var}(X)$；截断正态均值 $m+\sigma\frac{\phi(m/\sigma)}{\Phi(m/\sigma)}$（Exp 先验×高斯似然，$m=y-\lambda\sigma^2$）。
- **套路**：带帽＝只要一二阶矩；不带帽＝Bayes 后验均值（配方认分布）。
- **易错**：帽与不帽区分；独立和方差相加、协方差只留自身项。

## 考点 9 | Kalman 滤波（作业2-P5）
- **记背**：标量模板 $K=\frac{\Sigma^-}{\Sigma^-+R}$；$\hat x^+=\hat x^-+K(y-\hat x^-)$；$\Sigma^+=(1-K)\Sigma^-$；$\hat x^-_{k+1}=F\hat x^+$；$\Sigma^-_{k+1}=F^2\Sigma^++Q$；作业特例 $K_k=\frac{\sigma_k^2}{1+\sigma_k^2}$、$\sigma^2_{k+1}=\frac{f^2\sigma_k^2}{1+\sigma_k^2}+1$；向量形式 $K=\Sigma^-H^T(H\Sigma^-H^T+R)^{-1}$、$\Sigma^+=(I-KH)\Sigma^-$、$\Sigma^-_{k+1}=F\Sigma^+F^T+Q$。
- **套路**：更新-预测两步写清＋初值 $\hat x_{0|-1}=E[x_0]$、$\Sigma^-_0=\mathrm{Var}(x_0)$；可合并为一步递推。
- **易错**：$Q$（过程噪声）与 $R$（观测噪声）别代反；下标自洽。

## 考点 10 | 平稳性与遍历性（课件 P4）
- **记背**：WSS＝均值常数＋$R_X(t,t+\tau)=R_X(\tau)$；$R(0)=E[X_t^2]\ge|R(\tau)|$；$R(-\tau)=R(\tau)$（实）；$X_t=A\cos(\omega t+\Theta)$、$\Theta\sim U[0,2\pi)$⇒WSS 且 $R(\tau)=\frac{A^2}{2}\cos\omega\tau$；均值遍历⇔$\frac1T\int_0^T(1-\frac{\tau}{T})C(\tau)d\tau\to0$（离散 $\frac1n\sum_k(1-\frac kn)C(k)\to0$）。

## 考点 11 | 泊松过程（课件 P4）
- **记背**：$P\{N(t)=k\}=e^{-\lambda t}(\lambda t)^k/k!$；独立平稳增量；$E[N(t)]=\mathrm{Var}(N(t))=\lambda t$；间隔 $T_i$ i.i.d. $\mathrm{Exp}(\lambda)$（无记忆）；独立叠加＝泊松（速率相加）；独立稀释（概率 $p$）＝泊松($\lambda p$) 且独立；给定 $N(t)=n$ 到达时刻＝$n$ 个 i.i.d. $U[0,t]$ 的顺序统计量。

## 考点 12 | 马尔可夫链（课件 P4）
- **记背**：马氏性 $P\{X_{n+1}|X_0..X_n\}=P\{X_{n+1}|X_n\}$；转移矩阵行和 1；C-K $P^{(n+m)}=P^nP^m$；分布演化 $\mu_{n+1}=\mu_nP$；平稳分布 $\pi P=\pi$、$\sum\pi_i=1$；两态 $\begin{pmatrix}1-a&a\\b&1-b\end{pmatrix}\Rightarrow\pi=\big(\frac{b}{a+b},\frac{a}{a+b}\big)$。

## 通用记背 | 分布 · 积分 · 不等式 · 矩阵 · 矩
- **分布（均值/方差/特征函数）**：$\mathrm{Be}(p)$：$p$，$p(1-p)$，$1-p+pe^{ju}$；$\mathrm{Bin}(n,p)$：$np$，$np(1-p)$，$(1-p+pe^{ju})^n$；$\mathrm{Pois}(\lambda)$：$\lambda$，$\lambda$，$e^{\lambda(e^{ju}-1)}$；$U[a,b]$：$\frac{a+b}2$，$\frac{(b-a)^2}{12}$，$\frac{e^{jub}-e^{jua}}{ju(b-a)}$；$\mathrm{Exp}(\lambda)$：$\frac1\lambda$，$\frac1{\lambda^2}$，$\frac{\lambda}{\lambda-ju}$；$N(\mu,\sigma^2)$：$\mu$，$\sigma^2$，$e^{ju\mu-\sigma^2u^2/2}$。
- **积分/极限**：$\int_{-\infty}^{\infty}e^{-ax^2+bx}dx=\sqrt{\pi/a}\,e^{b^2/(4a)}$；$\int_0^\infty x^ne^{-ax}dx=n!/a^{n+1}$；高斯×高斯⇒精度相加；$(1+z_n/n)^n\to e^z$；Taylor：$e^x=1+x+\frac{x^2}2$，$\cos x=1-\frac{x^2}2$，$\ln(1+x)=x-\frac{x^2}2$。
- **三角正交**：$\Theta\sim U[0,2\pi)$：$E[\cos n\Theta]=0$、$E[\cos^2n\Theta]=\frac12$、$E[\cos n\Theta\cos m\Theta]=0$（$n\ne m$）；$n\Theta\bmod2\pi\sim U[0,2\pi)$；积化和差。
- **不等式**：Markov、Chebyshev、Chernoff、Cauchy–Schwarz $|E[XY]|\le\sqrt{E[X^2]E[Y^2]}$、Jensen（凸）、$(a+b)^2\le2a^2+2b^2$。
- **矩阵/矩**：2×2 逆 $\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$；协方差对称半正定（特征值/主子式≥0）；Cholesky 对角元＝新息方差；$M_Z^{(k)}(0)=E[Z^k]$；$\mathrm{Cov}(AX+b,CY+d)=A\mathrm{Cov}(X,Y)C^T$；$\mathrm{Var}=E[X^2]-(E[X])^2$。

## 反例库（收敛关系"反之不成立"）
- **a.s.⇏m.s.**：$X_n=n\cdot\mathbf1_{(0,1/n]}$：a.s.→0 但 $E[X_n^2]=n\to\infty$。
- **m.s./p⇏a.s.**：滑动 blips $\mathbf1_{I_n}$，$|I_n|\to0$ 反复扫过：m.s.、p→0 但不 a.s.（每点无限次命中）。
- **d⇏p**：$X\sim N(0,1)$、$X_n=-X$：同分布⇒d 收敛，但 $X_n-X=-2X\not\to0$。
- **p⇏m.s.（无界）**：$X_n=n$ w.p. $1/n$：p→0 但 $E[X_n^2]=n\to\infty$。
- **不连续映射**：$X_n=(-1)^n/n\to0$，阶跃 $h\Rightarrow h(X_n)=(-1)^n$ 不收敛。
- **有界救场**：$|X_n|\le C$ 且 p 收敛⇒m.s. 收敛。

## 证明手法速查
- **证 a.s.**：Borel–Cantelli（$\sum P<\infty$）／逐点分析／单调有界／连续映射。
- **证 m.s.**：直接二阶矩／Cauchy 准则／控制收敛交换极限。
- **证 p**：定义＋Markov/Chebyshev／借 m.s. 或 a.s.。
- **证 d**：Lévy 特征函数／CDF 连续点／同分布／CLT·Poisson 模板。
- **证不收敛**：增量不趋于 0／Cauchy 失败／特征函数振荡或极限在 0 不连续／有界+p⇒m.s. 矛盾／$(-1)^n$ 振荡。
