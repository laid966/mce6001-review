# MCE6001 随机过程 · 一页小抄
<meta>赵铖城 226010078 · Fall 26 · 作业 1+2 原题与全解 · 一张 A4 双面</meta>

## A1-P1 (10分) 均方收敛充要条件
**解**：$n>m$ 时 $S_n-S_m=\sum_{i=m+1}^n X_i$，$E[(S_n-S_m)^2]=\sum_{i=m+1}^n E[X_i^2]+2\sum_{i<j}E[X_iX_j]\overset{独立,零均值}{=}\sum_{i=m+1}^n \mathrm{Var}(X_i)$（交叉项 $E[X_iX_j]=E[X_i]E[X_j]=0$）。(⇐) 级数收敛⇒尾部和 $\sum_{m+1}^n\mathrm{Var}(X_i)\to0$⇒$E[(S_n-S_m)^2]\to0$⇒Cauchy 准则⇒m.s. 收敛。(⇒) m.s. 收敛⇒Cauchy 准则⇒$\sum_{m+1}^n\mathrm{Var}(X_i)\to0$⇒部分和 $T_n$ 为 $\mathbb{R}$ 中 Cauchy 列⇒收敛⇒$\sum\mathrm{Var}(X_i)<\infty$。∎

## A1-P2 (30分) Rademacher 和的特征函数与四种收敛
**解(a)**：$\Phi_{X_1}(u)=\tfrac12 e^{ju}+\tfrac12 e^{-ju}=\cos u$；独立⇒$\Phi_{S_n}(u)=\prod E[e^{juX_i}]=(\cos u)^n$；$\Phi_{V_n}(u)=\Phi_{S_n}(u/\sqrt n)=(\cos\tfrac{u}{\sqrt n})^n$。
**(b)** $\Phi_{S_n}(u)=(\cos u)^n$：$u=2k\pi\to1$；$u=(2k+1)\pi$ 为 $(-1)^n$ **不收敛**；其余 $|\cos u|<1\to0$ ⇒ 非逐点收敛。$\Phi_{V_n}(u)=(1-\tfrac{u^2}{2n}+o(\tfrac1n))^n\to e^{-u^2/2}$（对一切 $u$）。
**(c)** 全不收敛：a.s.✗（若 $S_n\xrightarrow{a.s.}S$ 则 $X_n=S_n-S_{n-1}\xrightarrow{a.s.}0$，但 $|X_n|=1$）；m.s.✗（$E[(S_n-S_m)^2]=n-m$，取 $n=2m\to\infty$，Cauchy 失败）；d✗（$u=\pi$ 处 $\Phi_{S_n}=(-1)^n$ 不收敛，违 Lévy）；p✗（p⇒d）。附：$V_n\xrightarrow{d}N(0,1)$（Lévy）。

## A1-P3 (20分) Chernoff 界
**解(a)**：$t\ge0$ 时 $e^{tz}$ 递增⇒$\{Z\ge E[Z]+c\}=\{e^{tZ}\ge e^{t(E[Z]+c)}\}$；$e^{tZ}\ge0$ 用 Markov：$P\le E[e^{tZ}]/e^{t(E[Z]+c)}=e^{-t(E[Z]+c)}M_Z(t)$。
**(b)** $M_Z(t)=e^{\mu t+\sigma^2t^2/2}$⇒界 $=e^{\frac12\sigma^2t^2-tc}$；$g(t)=\tfrac12\sigma^2t^2-tc$，$g'=\sigma^2t-c=0\Rightarrow t^*=c/\sigma^2$，$g(t^*)=-c^2/(2\sigma^2)$⇒**最优界 $e^{-c^2/(2\sigma^2)}$**。

## A1-P4 (20分) 连续映射与反例
**解(a)** 必存在，极限 $g(X)$：$\exists\Omega_0, P(\Omega_0)=1$，$\forall\omega\in\Omega_0: X_n(\omega)\to X(\omega)$；$g$ 连续⇒$g(X_n(\omega))\to g(X(\omega))$⇒$g(X_n)\xrightarrow{a.s.}g(X)$。
**(b)** 不一定。反例 $X\equiv0$，$X_n=(-1)^n/n\xrightarrow{a.s.}0$；$n$ 偶 $X_n=1/n>0\Rightarrow h=1$；$n$ 奇 $X_n=-1/n\le0\Rightarrow h=-1$⇒$h(X_n)=(-1)^n$ 不收敛。∎

## A1-P5 (20分) $\cos(n\Theta)$ 与几何衰减
**解(a)** a.s.✗（对 a.e. $\theta$，$\{n\theta\bmod2\pi\}$ 在 $[0,2\pi]$ 稠密⇒$\cos(n\theta)$ 振荡无极限）；m.s.✗（$E[X_n]=0$，$E[X_n^2]=\tfrac12$，$n\ne m$ 时 $E[X_nX_m]=\tfrac12E[\cos((n-m)\Theta)+\cos((n+m)\Theta)]=0$⇒$E[(X_n-X_m)^2]=1\not\to0$）；**d✓**（$n\Theta\bmod2\pi\sim U[0,2\pi)$⇒$X_n$ 与 $\cos\Theta$ 同分布⇒$X_n\xrightarrow{d}\cos\Theta$，密度 $\tfrac{1}{\pi\sqrt{1-x^2}}$）；p✗（若 p 收敛则 $X_{2n}-X_n\xrightarrow{p}0$，有界⇒m.s. 收敛，与 $E[(X_{2n}-X_n)^2]=1$ 矛盾）。
**(b)** $W=|1-\Theta/\pi|\in[0,1]$ 且 $W=1$ 仅零概率⇒$W<1$ a.s.⇒**a.s.→0**；m.s.：$E[Y_n^2]=\frac1{2\pi}\int_0^{2\pi}|1-\theta/\pi|^{2n}d\theta=\frac12\int_{-1}^1w^{2n}dw=\frac1{2n+1}\to0$；故 p、d 亦→0。四种全✓。

## A2-P1 (30分) 联合高斯三问
**解(a)** $X\sim N(0,4)$：$P= P\{X\ge3\}+P\{X\le-1\}=1-\Phi(\tfrac32)+\Phi(-\tfrac12)=2-\Phi(\tfrac12)-\Phi(\tfrac32)\approx0.3753$。
**(b)** $E[X|Y=y]=\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}y=\frac{6}{18}y=\frac y3$；$\mathrm{Var}(X|Y)=4-\frac{36}{18}=2$⇒$X|Y=3\sim N(1,2)$，$f_{X|Y}(x|3)=\frac1{2\sqrt\pi}e^{-(x-1)^2/4}$。
**(c)** $Z=X-\frac Y3$：$E[Z]=0$；$\mathrm{Var}(Z)=4-2\cdot\frac13\cdot6+\frac19\cdot18=2$；$\mathrm{Cov}(Z,Y)=6-\frac13\cdot18=0$⇒高斯下独立⇒$Z\sim N(0,2)$⇒$P\{|Z|\ge1\}=2(1-\Phi(\tfrac1{\sqrt2}))\approx0.4795$。

## A2-P2 (30分) 新息序列与正交 MMSE
**解(a)** $\tilde Y_1=Y_1$；$\tilde Y_2=Y_2-\frac{\mathrm{Cov}(Y_2,Y_1)}{\mathrm{Var}(Y_1)}Y_1=Y_2-\frac12Y_1$；$(\alpha,\beta)=\mathrm{Cov}(Y_3,(Y_1,Y_2))\mathrm{Cov}(Y_1,Y_2)^{-1}=(\tfrac12,\tfrac12)\cdot\frac43\begin{pmatrix}1&-\tfrac12\\-\tfrac12&1\end{pmatrix}=(\tfrac13,\tfrac13)$⇒$\tilde Y_3=Y_3-\frac13Y_1-\frac13Y_2$；$A=\begin{pmatrix}1&0&0\\-\tfrac12&1&0\\-\tfrac13&-\tfrac13&1\end{pmatrix}$。
**(b)** 正交⇒对角：$\mathrm{Var}(\tilde Y_1)=1$，$\mathrm{Var}(\tilde Y_2)=1-\tfrac14=\tfrac34$，$\mathrm{Var}(\tilde Y_3)=1-(\tfrac13\cdot\tfrac12+\tfrac13\cdot\tfrac12)=\tfrac23$；$\mathrm{Cov}(\tilde Y)=\mathrm{diag}(1,\tfrac34,\tfrac23)$。$\mathrm{Cov}(X,\tilde Y)=(0,\ \tfrac14-0,\ \tfrac14-0-\tfrac13\cdot\tfrac14)=(0,\tfrac14,\tfrac16)$。
**(c)** 对角⇒逐项最优 $a_i=\mathrm{Cov}(X,\tilde Y_i)/\mathrm{Var}(\tilde Y_i)$：**$a=0$，$b=\frac{1/4}{3/4}=\frac13$，$c=\frac{1/6}{2/3}=\frac14$**；最小 MSE $=1-0-\frac{1/16}{3/4}-\frac{1/36}{2/3}=\frac78$。

## A2-P3 (10分) 条件期望基本性质
**解**：$X=g(U)$ 为 $\sigma(U)$-可测⇒**$E[X|U]=X=\frac1{1+U}$，MSE $=0$**。

## A2-P4 (10分) 线性 MMSE
**解**：$E[Y]=1/\lambda$；$\mathrm{Cov}(X,Y)=\mathrm{Var}(X)=1/\lambda^2$；$\mathrm{Var}(Y)=1/\lambda^2+\sigma^2$。$\widehat E[X|Y]=\frac1\lambda+\frac{1/\lambda^2}{1/\lambda^2+\sigma^2}(Y-\frac1\lambda)=\frac1\lambda+\frac{Y-1/\lambda}{1+\lambda^2\sigma^2}$；MSE $=\frac1{\lambda^2}-\frac{1/\lambda^4}{1/\lambda^2+\sigma^2}=\frac{\sigma^2}{1+\lambda^2\sigma^2}$。
**附（精确 MMSE）**：后验 $\propto\lambda e^{-\lambda x}e^{-(y-x)^2/2\sigma^2}\mathbf1\{x\ge0\}$，配方 $m=y-\lambda\sigma^2$⇒$(X|Y=y)$ 为 $N(m,\sigma^2)$ 截断 $[0,\infty)$⇒$E[X|Y=y]=m+\sigma\frac{\phi(m/\sigma)}{\Phi(m/\sigma)}$。

## A2-P5 (20分) 标量 Kalman 滤波
**解**：$Q=R=1$，$H=1$，$F=f$；初值 $\hat x_{0|-1}=0$，$\sigma^2_0=\sigma^2$。更新：$K_k=\frac{\sigma^2_k}{\sigma^2_k+1}$；$\hat x_{k|k}=\hat x_{k|k-1}+K_k(y_k-\hat x_{k|k-1})$；$\mathrm{Cov}(x_k-\hat x_{k|k})=(1-K_k)\sigma^2_k=\frac{\sigma^2_k}{\sigma^2_k+1}$。预测：$\hat x_{k+1|k}=f\hat x_{k|k}$；$\sigma^2_{k+1}=f^2(1-K_k)\sigma^2_k+1=\frac{f^2\sigma^2_k}{1+\sigma^2_k}+1$。合并：$\hat x_{k+1|k}=f[\hat x_{k|k-1}+K_k(y_k-\hat x_{k|k-1})]$，$K_k=\frac{\sigma^2_k}{1+\sigma^2_k}$，$\sigma^2_{k+1}=\frac{f^2\sigma^2_k}{1+\sigma^2_k}+1$。

## 必背速记
收敛链：$a.s.\Rightarrow p\Rightarrow d$，$m.s.\Rightarrow p\Rightarrow d$，反之均不成立；有界+p 收敛⇒m.s. 收敛。m.s. Cauchy：$E[(X_n-X_m)^2]\to0$。Lévy：$\Phi_n\to\Phi$ 逐点且 $\Phi$ 在 0 连续⇔d 收敛。联合高斯：$E[X|Y=y]=\mu_X+\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(y-\mu_Y)$，$\mathrm{Var}(X|Y)=\mathrm{Var}(X)-\frac{\mathrm{Cov}^2}{\mathrm{Var}(Y)}$；不相关⇔独立；误差 $\perp$ 观测。线性 MMSE：$\widehat E[X|Y]=\mu_X+\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(Y-\mu_Y)$，MSE $=\mathrm{Var}(X)(1-\rho^2)$。Markov $P\{Y\ge a\}\le E[Y]/a$；Chebyshev $\le\sigma^2/\epsilon^2$。$\Phi(.5)=.6915$，$\Phi(1)=.8413$，$\Phi(1.5)=.9332$，$\Phi(2)=.9772$，$\Phi(1/\sqrt2)=.7602$。

## 课件考点附录（Part 1–4 浓缩）
- **四种收敛定义**：a.s.：$P\{\omega:\lim_n X_n(\omega)=X(\omega)\}=1$；m.s.：$E[(X_n-X)^2]\to0$；p：$\forall\epsilon>0, P\{|X_n-X|\ge\epsilon\}\to0$；d：$F_{X_n}(x)\to F_X(x)$（$F_X$ 连续点）。关系：$a.s.\Rightarrow p\Rightarrow d$，$m.s.\Rightarrow p$；p 收敛⇒存在 a.s. 收敛子列；**有界 + p⇒m.s.**
- **Borel–Cantelli**：$\sum P(A_n)<\infty\Rightarrow P(A_n\ i.o.)=0$；独立且 $\sum P(A_n)=\infty\Rightarrow P(i.o.)=1$（证 a.s. 收敛利器）。
- **大数/中心极限**：WLLN $\bar X_n\xrightarrow{p}\mu$（方差有限）；SLLN（i.i.d. 均值有限）；CLT $\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1)$；Poisson 逼近 $(1+z_n/n)^n\to e^z$；$\bar X_n$ 偏差 $O(1)$ 用 Chernoff/大偏差，$O(1/\sqrt n)$ 用 CLT。
- **特征函数**：$\Phi_X(u)=E[e^{juX}]$ 唯一决定分布；独立和相乘；$\Phi_{aX+b}(u)=e^{jub}\Phi_X(au)$；Lévy 连续性定理；$\Phi$ 在 0 连续是关键。
- **连续映射**：$g$ 连续⇒a.s./p 收敛保持；d 版本要求 $g$ 在极限分布的支撑上 a.s. 连续；不连续点可构造反例。
- **联合高斯性质**：线性变换仍高斯；不相关⇔独立；边缘仍高斯；条件分布高斯（公式见必背）；$\mathrm{Cov}$ 对称半正定。
- **条件期望性质**：$E[E[X|Y]]=E[X]$；$X=g(Y)\Rightarrow E[X|Y]=X$；取出已知 $E[g(Y)X|Y]=g(Y)E[X|Y]$；塔式 $E[E[X|Y,Z]|Y]=E[X|Y]$；$E[X|Y]$ 是 MMSE 最优且误差正交：$E[(X-E[X|Y])h(Y)]=0$。
- **线性估计/投影**：闭线性子空间上投影唯一（正交原理）；新息正交化 $\tilde Y_k=Y_k-\widehat E[Y_k|Y_1..Y_{k-1}]$；$\widehat E[X|Y_1..Y_k]=\sum_i\frac{\mathrm{Cov}(X,\tilde Y_i)}{\mathrm{Var}(\tilde Y_i)}\tilde Y_i$；$\mathrm{MSE}=\mathrm{Var}(X)-\sum_i\frac{\mathrm{Cov}(X,\tilde Y_i)^2}{\mathrm{Var}(\tilde Y_i)}$。
- **宽平稳与遍历**：均值常数 + $R_X(t_1,t_2)=R_X(t_1-t_2)$；$|R(\tau)|\le R(0)=E[X^2]$；均值遍历⇔$\frac1T\int_0^T(1-\frac{\tau}{T})C(\tau)d\tau\to0$（离散类似）。
- **泊松过程**：速率 $\lambda$：$N(t)\sim\mathrm{Poisson}(\lambda t)$，独立平稳增量；到达间隔 i.i.d. $\mathrm{Exp}(\lambda)$；$E[N(t)]=\lambda t$；给定 $N(t)=n$ 到达时刻 = $n$ 个 i.i.d. $U[0,t]$ 的顺序统计量；叠加/分解保持泊松。
- **马尔可夫链**：$P\{X_{n+1}|X_0..X_n\}=P\{X_{n+1}|X_n\}$；转移矩阵行和 1；C-K 方程 $P^{(n+m)}=P^nP^m$；平稳分布 $\pi P=\pi$，$\sum\pi_i=1$。
- **Kalman 向量形式**：$K_k=\Sigma_k^-H^T(H\Sigma_k^-H^T+R)^{-1}$；$\hat x_k^+=\hat x_k^-+K_k(y_k-H\hat x_k^-)$；$\Sigma_k^+=(I-K_kH)\Sigma_k^-$；$\hat x_{k+1}^-=F\hat x_k^+$；$\Sigma_{k+1}^-=F\Sigma_k^+F^T+Q$。

## 反例库（收敛关系一律"反之不成立"）
- **a.s.⇏m.s.**：$X_n=n\cdot\mathbf1_{(0,1/n]}$（$[0,1]$ Lebesgue）：a.s.→0 但 $E[X_n^2]=n\to\infty$。
- **m.s./p⇏a.s.**：滑动 blips $X_n=\mathbf1_{I_n}$，$|I_n|\to0$ 反复扫过 $[0,1]$：m.s.、p→0，但每个 $\omega$ 无限次命中⇒不 a.s.；取 $I_n$ 长度 $1/n$（调和）则 Borel–Cantelli 第二引理给 a.s. 不收敛。
- **d⇏p**：$X\sim N(0,1)$，$X_n=-X$：$X_n\xrightarrow{d}X$（同分布）但 $X_n-X=-2X\not\to0$（不 p）。
- **p⇏m.s.（无界时）**：$X_n=n$ w.p. $1/n$，否则 0：p→0 但 $E[X_n^2]=n\to\infty$。
- **不连续映射反例**：$X_n=(-1)^n/n\xrightarrow{a.s.}0$，$h=\mathrm{sign}^+$ 阶跃⇒$h(X_n)=(-1)^n$ 不收敛（作业1 P4）。
- **有界救场**：$|X_n|\le C$ 且 p 收敛⇒m.s. 收敛（作业1 P5(a) 否 p 的钥匙）。

## 题型识别关键词 → 套路
- "证明 m.s. 收敛/充要条件"⇒展开 $E[(S_n-S_m)^2]$ + Cauchy 准则（A1-P1）。
- "特征函数/逐点极限/四种收敛"⇒独立和相乘、缩放 $\Phi(u/\sqrt n)$、$(\cos\frac{u}{\sqrt n})^n\to e^{-u^2/2}$；否 a.s. 用增量不趋于 0（A1-P2）。
- "尾概率上界/优化"⇒Markov + 指数倾斜 + 对 $t$ 求导（A1-P3）。
- "连续/不连续函数变换"⇒连续映射定理 / 横跳反例（A1-P4）。
- "$\Theta\sim U[0,2\pi)$ 三角序列"⇒正交性、同分布、稠密振荡；$|W|^n$ 几何衰减（A1-P5）。
- "联合高斯/条件密度/误差概率"⇒条件均值方差公式、误差⊥观测⇒独立（A2-P1）。
- "新息/正交化/系数优化"⇒Gram–Schmidt、对角协方差、逐项 $\mathrm{Cov}/\mathrm{Var}$（A2-P2）。
- "$X=g(U)$ 求条件期望"⇒可测性直接得 $X$，MSE=0（A2-P3）。
- "带帽 $\widehat E$"⇒线性 MMSE 一二阶矩公式；"不带帽"⇒后验均值（A2-P4）。
- "状态空间/递推估计"⇒KF 更新-预测模板 + Riccati（A2-P5）。

## 基础知识与计算工具箱
- **常用分布（均值 / 方差 / 特征函数）**：$\mathrm{Be}(p)$：$p$，$p(1-p)$，$1-p+pe^{ju}$；$\mathrm{Bin}(n,p)$：$np$，$np(1-p)$，$(1-p+pe^{ju})^n$；$\mathrm{Pois}(\lambda)$：$\lambda$，$\lambda$，$e^{\lambda(e^{ju}-1)}$；$U[a,b]$：$\frac{a+b}2$，$\frac{(b-a)^2}{12}$，$\frac{e^{jub}-e^{jua}}{ju(b-a)}$；$\mathrm{Exp}(\lambda)$：$\frac1\lambda$，$\frac1{\lambda^2}$，$\frac{\lambda}{\lambda-ju}$；$N(\mu,\sigma^2)$：$\mu$，$\sigma^2$，$e^{ju\mu-\sigma^2u^2/2}$。
- **高斯积分与配方**：$\int_{-\infty}^{\infty}e^{-ax^2+bx}dx=\sqrt{\pi/a}\,e^{b^2/(4a)}$；高斯先验×高斯似然⇒后验高斯（精度相加：$\frac1{\sigma_{post}^2}=\frac1{\sigma_{prior}^2}+\frac1{\sigma_{lik}^2}$）；Exp 先验×高斯似然⇒截断高斯（A2-P4）；$\int_0^{\infty}x^ne^{-ax}dx=n!/a^{n+1}$。
- **截断正态**：$N(m,\sigma^2)$ 截到 $[0,\infty)$：均值 $m+\sigma R(u)$，方差 $\sigma^2(1-uR(u)-R(u)^2)$，$u=m/\sigma$，$R(u)=\phi(u)/\Phi(u)$；$Z\sim N(0,1)$ 截 $[\alpha,\infty)$：均值 $\phi(\alpha)/(1-\Phi(\alpha))$。
- **三角与正交**：$\cos u=\frac{e^{ju}+e^{-ju}}2$；积化和差 $\cos a\cos b=\frac12[\cos(a-b)+\cos(a+b)]$；$\Theta\sim U[0,2\pi)$：$E[\cos n\Theta]=0$，$E[\cos^2 n\Theta]=\frac12$，$E[\cos n\Theta\cos m\Theta]=0$（$n\ne m$）；$n\Theta\bmod2\pi\sim U[0,2\pi)$。
- **Taylor/极限**：$e^x=1+x+\frac{x^2}2+\dots$；$\cos x=1-\frac{x^2}2+o(x^2)$；$\ln(1+x)=x-\frac{x^2}2+\dots$；$(1+z_n/n)^n\to e^z$；$(\cos\frac{u}{\sqrt n})^n\to e^{-u^2/2}$；$\sum_{i=m+1}^n$ 尾部→0⇔级数收敛。
- **矩与协方差**：$M_Z^{(k)}(0)=E[Z^k]$；$\mathrm{Var}=E[X^2]-(E[X])^2$；$\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]$；$\rho=\mathrm{Cov}/(\sigma_X\sigma_Y)$；全期望 $E[X]=E[E[X|Y]]$；全方差 $\mathrm{Var}(X)=E[\mathrm{Var}(X|Y)]+\mathrm{Var}(E[X|Y])$；$\mathrm{Cov}(AX+b,CY+d)=A\mathrm{Cov}(X,Y)C^T$。
- **不等式**：Markov $P\{Y\ge a\}\le E[Y]/a$；Chebyshev $P\{|X-\mu|\ge\epsilon\}\le\sigma^2/\epsilon^2$；Chernoff $\le e^{-t(E[Z]+c)}M_Z(t)$；Cauchy–Schwarz $|E[XY]|\le\sqrt{E[X^2]E[Y^2]}$；Jensen $\varphi(E[X])\le E[\varphi(X)]$（凸）；$(a+b)^2\le2a^2+2b^2$。
- **矩阵工具**：$\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$；$\begin{pmatrix}1&r\\r&1\end{pmatrix}^{-1}=\frac1{1-r^2}\begin{pmatrix}1&-r\\-r&1\end{pmatrix}$；协方差矩阵对称半正定（特征值≥0 / 顺序主子式≥0）；Cholesky 对角元 = 新息方差。

## 重要定理速查
- **收敛判定**：L2 完备⇒m.s. Cauchy 准则；Lévy 连续性定理（d⇔特征函数逐点→0 处连续）；a.s.⇔$\forall\epsilon\ P\{\sup_{m\ge n}|X_m-X|>\epsilon\}\to0$；p 收敛⇔任一子列有 a.s. 收敛子子列。
- **Borel–Cantelli**：$\sum P(A_n)<\infty\Rightarrow P(i.o.)=0$；独立+$\sum=\infty\Rightarrow P(i.o.)=1$。
- **大数/中心极限**：WLLN（方差有限）$\bar X_n\xrightarrow p\mu$；SLLN（i.i.d. 一阶矩）；CLT $\sqrt n(\bar X_n-\mu)/\sigma\xrightarrow d N(0,1)$；De Moivre–Laplace；Poisson 定理 $\mathrm{Bin}(n,\lambda/n)\to\mathrm{Pois}(\lambda)$。
- **收敛定理（交换极限与期望）**：单调收敛（非负递增）；控制收敛（$|X_n|\le Y$，$E[Y]<\infty$）；有界收敛；用于证 m.s.⇒期望收敛、$E[Y_n^2]\to0$。
- **连续映射定理**：a.s./p 版本 $g$ 连续即可；d 版本需 $P\{X\in D_g\}=0$。
- **估计理论**：$E[X|Y]$ = 无约束 MMSE（投影到 $\sigma(Y)$ 可测函数子空间），误差正交；$\widehat E[X|Y]$ = 线性子空间投影，只需二阶矩；正交原理⇒存在唯一；新息序列正交化⇒对角化求解；Kalman = 高斯/线性模型下递推投影（最优）。
- **平稳/遍历**：宽平稳定义；自相关性质 $R(0)\ge|R(\tau)|$、$R$ 偶（实过程）；均值遍历⇔时间平均协方差→0；泊松过程/马尔可夫链基本量（见附录）。
