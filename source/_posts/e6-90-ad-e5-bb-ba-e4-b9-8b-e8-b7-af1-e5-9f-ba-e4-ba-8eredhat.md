---
title: 搭建之路1-基于redhat
id: 405
categories:
  - JAVA
  - 编程语言
date: 2018-02-06 11:25:38
tags:
---

*   **<span style="font-size: 18pt;">jdk安装</span>**

比较常见,直接粘贴所有命令
<pre class="lang:sh decode:true ">#1.解压复制
sudo tar -zxvf /home/xjy/Downloads/jdk-8u144-linux-x64.tar.gz -C /usr/lib/jvm
#2.执行安装
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.8.0_144/bin/javac" 1 \  &amp;&amp; sudo update-alternatives --set javac /usr/lib/jvm/jdk1.8.0_144/bin/javac \ &amp;&amp; sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.8.0_144/bin/java" 1 \ &amp;&amp; sudo update-alternatives --set java /usr/lib/jvm/jdk1.8.0_144/bin/java
#3.验证版本
java -version
#4.另外可增加配置
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_144
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar</pre>

&nbsp;

*   **<span style="font-size: 18pt;">maven安装</span>**

1.下载安装包
<pre class="lang:sh decode:true">wget http://mirrors.cnnic.cn/apache/maven/maven-3/3.0.5/binaries/apache-maven-3.0.5-bin.tar.gz</pre>
2.解压
<pre class="lang:sh decode:true">tar zvxf apache-maven-3.0.5-bin.tar.gz</pre>
3.移到指定目录
<pre class="lang:sh decode:true ">mv apache-maven-3.0.5 /usr/local</pre>
4.编辑配置文件/etc/profile，加入
<pre class="nums:false whitespace-before:1 whitespace-after:1 lang:vim decode:true ">export MAVEN_HOME=/usr/local/apache-maven-3.0.5
export PATH=$PATH:$MAVEN_HOME/bin</pre>
5.始配置生效
<pre class="lang:sh decode:true">source /etc/profile</pre>
6.确认安装完成
<pre class="lang:sh decode:true">mvn -v</pre>

&nbsp;

*   **<span style="font-size: 18pt;">nexus安装</span>**

1.下载安装包
<pre class="lang:sh decode:true">wget https://sonatype-download.global.ssl.fastly.net/nexus/3/nexus-3.5.2-01-unix.tar.gz</pre>

2.解压并复制
<pre class="lang:sh decode:true">sudo tar -zxvf nexus-3.5.2-01-unix.tar.gz -C /usr/lib/nexus-xjy</pre>

3.做链接
<pre class="lang:sh decode:true">sudo ln -s /usr/lib/nexus-xjy/nexus-3.5.2-01/bin/nexus /etc/init.d/nexus</pre>

4.赋权限
<pre class="lang:sh decode:true">chmod 755 /etc/init.d/nexus</pre>

5.设置开机启动并运行
<pre class="lang:sh decode:true">cd /etc/init.d
chkconfig --add nexus
chkconfig --levels 345 nexus on
service nexus start
tail -fn 200 /usr/lib/nexus-xjy/sonatype-work/nexus3/log</pre>

6.配置请查考链接[https://www.xncoding.com/2017/09/02/tool/nexus.html](https://www.xncoding.com/2017/09/02/tool/nexus.html)

&nbsp;

*   **<span style="font-size: 18pt;">svn安装</span>**

1.yum安装svnversion
<pre class="lang:sh decode:true">#检查是否安装了低版本的SVN
rpm -qa subversion
#如果存储旧版本，卸载旧版本SVN
yum remove subversion
#安装SVN
yum install subversion
#验证安装版本信息
svnserve --version
#代码库创建
mkdir -p /opt/svn/                    #创建SVN根目录
svnadmin create /opt/svn/repo         #创建repo测试库</pre>

2.账户权限及防火墙配置
<pre class="lang:sh decode:true ">
2.1  编辑/opt/svn/repo/conf/passwd，加入如下内容：
[users]
# harry = harryssecret
# sally = sallyssecret
xjy= 123
www = 123

2.2  编辑/opt/svn/repo/conf/authz，加入如下内容：
[groups]
#创建一个admin组，将用户加入到组
admin = xjy,www
[/] #根目录权限设置（就是“svn”这个文件夹）
xjy = rw            #xjy对svn下的所有版本库有读写权限
www = r             #www对svn下的所有版本库有读权限
[repo:/]            #repo:/,表示对repo版本库下的所有资源设置权限
@admin = rw         #admin组的用户对repo版本库有读写权限

2.3  编辑/opt/svn/repo/conf/svnconfig.conf，加入如下内容：
[general]  
#匿名访问的权限，可以是read,write,none,默认为read  
anon-access = none  
#使授权用户有写权限  
auth-access = write  
#密码数据库的路径  
password-db = passwd  
#访问控制文件  
authz-db = authz  
#认证命名空间，subversion会在认证提示里显示，并且作为凭证缓存的关键字  
realm = /opt/svn/repo

2.4  编辑/etc/sysconfig/iptables，加入如下内容
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT
</pre>

3.启动SVN
<pre class="lang:sh decode:true ">#启动SVN
svnserve -d -r /opt/svn/
#查看SVN进程
ps -ef|grep svnserve
#检测SVN端口
netstat -ln |grep 3690</pre>

4.完成上面的步骤即可在客户端正常访问，地址：[svn://ip地址/repo](svn://ip地址/repo)

&nbsp;

*   **<span style="font-size: 18pt;">jenkins安装</span>**

1.安装
<pre class="lang:sh decode:true ">sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install jenkins</pre>

2.启动并加入开机启动项
<pre class="lang:sh decode:true ">sudo service jenkins start
sudo chkconfig jenkins on</pre>
3.访问[http://ip:8080](http://ip地址:8080)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;