# MCE6001 随机过程 · 一页小抄
<meta>赵铖城 226010078 · Fall 26 · 作业 1+2 原题与全解</meta>

## A1-P1 (10分) 均方收敛充要条件
**题**：$X_i$ 独立，$E[X_i]=0$，$E[X_i^2]<\infty$，$S_n=\sum_{i=1}^n X_i$。证 $(S_n)$ 均方收敛 $\Leftrightarrow \sum_{i=1}^\infty \mathrm{Var}(X_i)<\infty$。
**解**：$n>m$ 时 $S_n-S_m=\sum_{i=m+1}^n X_i$，$E[(S_n-S_m)^2]=\sum_{i=m+1}^n E[X_i^2]+2\sum_{i<j}E[X_iX_j]\overset{独立,零均值}{=}\sum_{i=m+1}^n \mathrm{Var}(X_i)$（交叉项 $E[X_iX_j]=E[X_i]E[X_j]=0$）。(⇐) 级数收敛⇒尾部和 $\sum_{m+1}^n\mathrm{Var}(X_i)\to0$⇒$E[(S_n-S_m)^2]\to0$⇒Cauchy 准则⇒m.s. 收敛。(⇒) m.s. 收敛⇒Cauchy 准则⇒$\sum_{m+1}^n\mathrm{Var}(X_i)\to0$⇒部分和 $T_n$ 为 $\mathbb{R}$ 中 Cauchy 列⇒收敛⇒$\sum\mathrm{Var}(X_i)<\infty$。∎

## A1-P2 (30分) Rademacher 和的特征函数与四种收敛
**题**：$P\{X_i=\pm1\}=\tfrac12$ 独立，$S_n=\sum X_i$，$V_n=S_n/\sqrt n$，$\Phi_Z(u)=E[e^{juZ}]$。(a) 求 $\Phi_{X_1},\Phi_{S_n},\Phi_{V_n}$；(b) 逐点收敛性；(c) $(S_n)$ 的 a.s./m.s./p/d 收敛性。
**解(a)**：$\Phi_{X_1}(u)=\tfrac12 e^{ju}+\tfrac12 e^{-ju}=\cos u$；独立⇒$\Phi_{S_n}(u)=\prod E[e^{juX_i}]=(\cos u)^n$；$\Phi_{V_n}(u)=\Phi_{S_n}(u/\sqrt n)=(\cos\tfrac{u}{\sqrt n})^n$。
**(b)** $\Phi_{S_n}(u)=(\cos u)^n$：$u=2k\pi\to1$；$u=(2k+1)\pi$ 为 $(-1)^n$ **不收敛**；其余 $|\cos u|<1\to0$ ⇒ 非逐点收敛。$\Phi_{V_n}(u)=(1-\tfrac{u^2}{2n}+o(\tfrac1n))^n\to e^{-u^2/2}$（对一切 $u$）。
**(c)** 全不收敛：a.s.✗（若 $S_n\xrightarrow{a.s.}S$ 则 $X_n=S_n-S_{n-1}\xrightarrow{a.s.}0$，但 $|X_n|=1$）；m.s.✗（$E[(S_n-S_m)^2]=n-m$，取 $n=2m\to\infty$，Cauchy 失败）；d✗（$u=\pi$ 处 $\Phi_{S_n}=(-1)^n$ 不收敛，违 Lévy）；p✗（p⇒d）。附：$V_n\xrightarrow{d}N(0,1)$（Lévy）。

## A1-P3 (20分) Chernoff 界
**题**：(a) 用 Markov 证 $P\{Z\ge E[Z]+c\}\le e^{-t(E[Z]+c)}M_Z(t)$；(b) $Z\sim N(\mu,\sigma^2)$ 求最优界与 $t^*$。
**解(a)**：$t\ge0$ 时 $e^{tz}$ 递增⇒$\{Z\ge E[Z]+c\}=\{e^{tZ}\ge e^{t(E[Z]+c)}\}$；$e^{tZ}\ge0$ 用 Markov：$P\le E[e^{tZ}]/e^{t(E[Z]+c)}=e^{-t(E[Z]+c)}M_Z(t)$。
**(b)** $M_Z(t)=e^{\mu t+\sigma^2t^2/2}$⇒界 $=e^{\frac12\sigma^2t^2-tc}$；$g(t)=\tfrac12\sigma^2t^2-tc$，$g'=\sigma^2t-c=0\Rightarrow t^*=c/\sigma^2$，$g(t^*)=-c^2/(2\sigma^2)$⇒**最优界 $e^{-c^2/(2\sigma^2)}$**。

## A1-P4 (20分) 连续映射与反例
**题**：$X_n\xrightarrow{a.s.}X$，$g$ 连续，$h(x)=\begin{cases}-1,&x\le0\\1,&x>0\end{cases}$。(a) $(g(X_n))$ 必有 a.s. 极限？(b) $(h(X_n))$ 呢？
**解(a)** 必存在，极限 $g(X)$：$\exists\Omega_0, P(\Omega_0)=1$，$\forall\omega\in\Omega_0: X_n(\omega)\to X(\omega)$；$g$ 连续⇒$g(X_n(\omega))\to g(X(\omega))$⇒$g(X_n)\xrightarrow{a.s.}g(X)$。
**(b)** 不一定。反例 $X\equiv0$，$X_n=(-1)^n/n\xrightarrow{a.s.}0$；$n$ 偶 $X_n=1/n>0\Rightarrow h=1$；$n$ 奇 $X_n=-1/n\le0\Rightarrow h=-1$⇒$h(X_n)=(-1)^n$ 不收敛。∎

## A1-P5 (20分) $\cos(n\Theta)$ 与几何衰减
**题**：$\Theta\sim U[0,2\pi)$。(a) $X_n=\cos(n\Theta)$；(b) $Y_n=|1-\Theta/\pi|^n$；判断四种收敛。
**解(a)** a.s.✗（对 a.e. $\theta$，$\{n\theta\bmod2\pi\}$ 在 $[0,2\pi]$ 稠密⇒$\cos(n\theta)$ 振荡无极限）；m.s.✗（$E[X_n]=0$，$E[X_n^2]=\tfrac12$，$n\ne m$ 时 $E[X_nX_m]=\tfrac12E[\cos((n-m)\Theta)+\cos((n+m)\Theta)]=0$⇒$E[(X_n-X_m)^2]=1\not\to0$）；**d✓**（$n\Theta\bmod2\pi\sim U[0,2\pi)$⇒$X_n$ 与 $\cos\Theta$ 同分布⇒$X_n\xrightarrow{d}\cos\Theta$，密度 $\tfrac{1}{\pi\sqrt{1-x^2}}$）；p✗（若 p 收敛则 $X_{2n}-X_n\xrightarrow{p}0$，有界⇒m.s. 收敛，与 $E[(X_{2n}-X_n)^2]=1$ 矛盾）。
**(b)** $W=|1-\Theta/\pi|\in[0,1]$ 且 $W=1$ 仅零概率⇒$W<1$ a.s.⇒**a.s.→0**；m.s.：$E[Y_n^2]=\frac1{2\pi}\int_0^{2\pi}|1-\theta/\pi|^{2n}d\theta=\frac12\int_{-1}^1w^{2n}dw=\frac1{2n+1}\to0$；故 p、d 亦→0。四种全✓。

## A2-P1 (30分) 联合高斯三问
**题**：零均值联合高斯 $\mathrm{Cov}\binom{X}{Y}=\begin{pmatrix}4&6\\6&18\end{pmatrix}$。(a) $P\{|X-1|\ge2\}$；(b) $X|Y=3$ 的条件密度；(c) $P\{|X-E[X|Y]|\ge1\}$。
**解(a)** $X\sim N(0,4)$：$P= P\{X\ge3\}+P\{X\le-1\}=1-\Phi(\tfrac32)+\Phi(-\tfrac12)=2-\Phi(\tfrac12)-\Phi(\tfrac32)\approx0.3753$。
**(b)** $E[X|Y=y]=\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}y=\frac{6}{18}y=\frac y3$；$\mathrm{Var}(X|Y)=4-\frac{36}{18}=2$⇒$X|Y=3\sim N(1,2)$，$f_{X|Y}(x|3)=\frac1{2\sqrt\pi}e^{-(x-1)^2/4}$。
**(c)** $Z=X-\frac Y3$：$E[Z]=0$；$\mathrm{Var}(Z)=4-2\cdot\frac13\cdot6+\frac19\cdot18=2$；$\mathrm{Cov}(Z,Y)=6-\frac13\cdot18=0$⇒高斯下独立⇒$Z\sim N(0,2)$⇒$P\{|Z|\ge1\}=2(1-\Phi(\tfrac1{\sqrt2}))\approx0.4795$。

## A2-P2 (30分) 新息序列与正交 MMSE
**题**：零均值 $(Y_1,Y_2,Y_3,X)^T$，$\mathrm{Cov}=\begin{pmatrix}1&\tfrac12&\tfrac12&0\\\tfrac12&1&\tfrac12&\tfrac14\\\tfrac12&\tfrac12&1&\tfrac14\\0&\tfrac14&\tfrac14&1\end{pmatrix}$。(a) 求 $A$:$\tilde Y=AY$；(b) $\mathrm{Cov}(\tilde Y)$、$\mathrm{Cov}(X,\tilde Y)$；(c) 最小化 $E[(X-a\tilde Y_1-b\tilde Y_2-c\tilde Y_3)^2]$。
**解(a)** $\tilde Y_1=Y_1$；$\tilde Y_2=Y_2-\frac{\mathrm{Cov}(Y_2,Y_1)}{\mathrm{Var}(Y_1)}Y_1=Y_2-\frac12Y_1$；$(\alpha,\beta)=\mathrm{Cov}(Y_3,(Y_1,Y_2))\mathrm{Cov}(Y_1,Y_2)^{-1}=(\tfrac12,\tfrac12)\cdot\frac43\begin{pmatrix}1&-\tfrac12\\-\tfrac12&1\end{pmatrix}=(\tfrac13,\tfrac13)$⇒$\tilde Y_3=Y_3-\frac13Y_1-\frac13Y_2$；$A=\begin{pmatrix}1&0&0\\-\tfrac12&1&0\\-\tfrac13&-\tfrac13&1\end{pmatrix}$。
**(b)** 正交⇒对角：$\mathrm{Var}(\tilde Y_1)=1$，$\mathrm{Var}(\tilde Y_2)=1-\tfrac14=\tfrac34$，$\mathrm{Var}(\tilde Y_3)=1-(\tfrac13\cdot\tfrac12+\tfrac13\cdot\tfrac12)=\tfrac23$；$\mathrm{Cov}(\tilde Y)=\mathrm{diag}(1,\tfrac34,\tfrac23)$。$\mathrm{Cov}(X,\tilde Y)=(0,\ \tfrac14-0,\ \tfrac14-0-\tfrac13\cdot\tfrac14)=(0,\tfrac14,\tfrac16)$。
**(c)** 对角⇒逐项最优 $a_i=\mathrm{Cov}(X,\tilde Y_i)/\mathrm{Var}(\tilde Y_i)$：**$a=0$，$b=\frac{1/4}{3/4}=\frac13$，$c=\frac{1/6}{2/3}=\frac14$**；最小 MSE $=1-0-\frac{1/16}{3/4}-\frac{1/36}{2/3}=\frac78$。

## A2-P3 (10分) 条件期望基本性质
**题**：$X=\frac1{1+U}$，$U\sim U[0,1]$。求 $E[X|U]$ 与 MSE。
**解**：$X=g(U)$ 为 $\sigma(U)$-可测⇒**$E[X|U]=X=\frac1{1+U}$，MSE $=0$**。

## A2-P4 (10分) 线性 MMSE
**题**：$Y=X+N$，$X\sim\mathrm{Exp}(\lambda)$，$N\sim N(0,\sigma^2)$ 独立。求 $\widehat E[X|Y]$ 与 MSE。（提示 $E[X]=1/\lambda$，$\mathrm{Var}(X)=1/\lambda^2$）
**解**：$E[Y]=1/\lambda$；$\mathrm{Cov}(X,Y)=\mathrm{Var}(X)=1/\lambda^2$；$\mathrm{Var}(Y)=1/\lambda^2+\sigma^2$。$\widehat E[X|Y]=\frac1\lambda+\frac{1/\lambda^2}{1/\lambda^2+\sigma^2}(Y-\frac1\lambda)=\frac1\lambda+\frac{Y-1/\lambda}{1+\lambda^2\sigma^2}$；MSE $=\frac1{\lambda^2}-\frac{1/\lambda^4}{1/\lambda^2+\sigma^2}=\frac{\sigma^2}{1+\lambda^2\sigma^2}$。
**附（精确 MMSE）**：后验 $\propto\lambda e^{-\lambda x}e^{-(y-x)^2/2\sigma^2}\mathbf1\{x\ge0\}$，配方 $m=y-\lambda\sigma^2$⇒$(X|Y=y)$ 为 $N(m,\sigma^2)$ 截断 $[0,\infty)$⇒$E[X|Y=y]=m+\sigma\frac{\phi(m/\sigma)}{\Phi(m/\sigma)}$。

## A2-P5 (20分) 标量 Kalman 滤波
**题**：$x_{k+1}=fx_k+w_k$，$y_k=x_k+v_k$；$x_0\sim N(0,\sigma^2)$；$w_k,v_k\sim N(0,1)$ 全独立。写 KF 递推（$\hat x_{k+1|k}$、$K_k$、$\sigma^2_{k+1}=\mathrm{Cov}(x_{k+1}-\hat x_{k+1|k})$）。
**解**：$Q=R=1$，$H=1$，$F=f$；初值 $\hat x_{0|-1}=0$，$\sigma^2_0=\sigma^2$。更新：$K_k=\frac{\sigma^2_k}{\sigma^2_k+1}$；$\hat x_{k|k}=\hat x_{k|k-1}+K_k(y_k-\hat x_{k|k-1})$；$\mathrm{Cov}(x_k-\hat x_{k|k})=(1-K_k)\sigma^2_k=\frac{\sigma^2_k}{\sigma^2_k+1}$。预测：$\hat x_{k+1|k}=f\hat x_{k|k}$；$\sigma^2_{k+1}=f^2(1-K_k)\sigma^2_k+1=\frac{f^2\sigma^2_k}{1+\sigma^2_k}+1$。合并：$\hat x_{k+1|k}=f[\hat x_{k|k-1}+K_k(y_k-\hat x_{k|k-1})]$，$K_k=\frac{\sigma^2_k}{1+\sigma^2_k}$，$\sigma^2_{k+1}=\frac{f^2\sigma^2_k}{1+\sigma^2_k}+1$。

## 必背速记
收敛链：$a.s.\Rightarrow p\Rightarrow d$，$m.s.\Rightarrow p\Rightarrow d$，反之均不成立；有界+p 收敛⇒m.s. 收敛。m.s. Cauchy：$E[(X_n-X_m)^2]\to0$。Lévy：$\Phi_n\to\Phi$ 逐点且 $\Phi$ 在 0 连续⇔d 收敛。联合高斯：$E[X|Y=y]=\mu_X+\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(y-\mu_Y)$，$\mathrm{Var}(X|Y)=\mathrm{Var}(X)-\frac{\mathrm{Cov}^2}{\mathrm{Var}(Y)}$；不相关⇔独立；误差 $\perp$ 观测。线性 MMSE：$\widehat E[X|Y]=\mu_X+\frac{\mathrm{Cov}}{\mathrm{Var}(Y)}(Y-\mu_Y)$，MSE $=\mathrm{Var}(X)(1-\rho^2)$。Markov $P\{Y\ge a\}\le E[Y]/a$；Chebyshev $\le\sigma^2/\epsilon^2$。$\Phi(.5)=.6915$，$\Phi(1)=.8413$，$\Phi(1.5)=.9332$，$\Phi(2)=.9772$，$\Phi(1/\sqrt2)=.7602$。
